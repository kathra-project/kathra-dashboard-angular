import { Component, OnInit, ElementRef } from '@angular/core';
import { NewEnvService } from '../../../../services/new-env.service';
import { K8sApplication, KathraAppConfComponent, K8sWsService } from '../../../../../kathra-data';
import { Router } from '@angular/router';

@Component({
  selector: 'kathra-new-env-config',
  templateUrl: './new-env-config.component.pug',
  styleUrls: ['./new-env-config.component.scss']
})
export class NewEnvConfigComponent implements OnInit {

  appsToConfigure: Array<K8sApplication> = [];
  noParamsApps: Array<K8sApplication> = [];
  configuredApps: Array<K8sApplication> = [];
  focusedAppIndex = 0;

  constructor(
    private newEnv: NewEnvService,
    private router: Router,
    private elRef: ElementRef,
    private k8sModel: K8sWsService
  ) { }

  addConfiguredApp($event){
    this.configuredApps.push($event);
    let appIdx = this.appsToConfigure.findIndex(item => item.name == $event.name);
    this.focusedAppIndex = appIdx + 1;

    this.shiftContent();
  }

  deploy(){
    if(this.configuredApps.length === this.appsToConfigure.length){
      let allApps = this.noParamsApps.concat(this.configuredApps);
      let pf = {
        name: this.newEnv.env.name,
        owner: "all",
        services: allApps,
        tags: this.newEnv.env.tags,
        status: null,
        events: null
      };
      
      console.log("Creating Env with payload: ", pf);
      this.k8sModel.createPlatform(pf);
      this.router.navigate(['kathra', 'environments']);
    }
  }

  autoShift(direction: string){
    switch(direction){
      case "left":
        this.focusedAppIndex -= 1;
        break;

      case "right":
        this.focusedAppIndex += 1;
        break;

      case "start":
        this.focusedAppIndex = 0;
        break;

      case "end":
        this.focusedAppIndex = this.appsToConfigure.length;
        break;
    }
    this.shiftContent();
    console.log("After::", this.appsToConfigure);
  }

  shiftContent() {
    let configurableContainer = <HTMLElement>this.elRef.nativeElement;
    let offset = this.focusedAppIndex*350;
    
    if(this.focusedAppIndex == this.appsToConfigure.length)
      offset += 150;

    configurableContainer.scrollLeft = offset;
  }

  ngOnInit() {
    for(let app of this.newEnv.env.services){
      if(app.parameters.length > 0){
        this.appsToConfigure.push(app);
      }
      else {
        this.noParamsApps.push(app);
      }
    }
    
    if(this.appsToConfigure.length == 0){
      let confContent = <HTMLElement>this.elRef.nativeElement.querySelector('.configuration-content');
      confContent.style.paddingLeft = "0px";
    }
  }
}
