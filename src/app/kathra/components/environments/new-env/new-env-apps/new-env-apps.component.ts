import { Component, OnInit, ElementRef } from '@angular/core';
import { NewEnvService } from '../../../../services/new-env.service';
import { SidebarsService } from '../../../../../kathra-sidebars';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kathra-new-env-apps',
  templateUrl: './new-env-apps.component.pug',
  styleUrls: ['./new-env-apps.component.scss']
})
export class NewEnvAppsComponent implements OnInit {

  selectedApps: Array<string> = [];

  constructor(
    private elRef: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
    private sb: SidebarsService,
    private newEnv: NewEnvService
  ) { }

  updateSelection($event, app){
    let checked = $event.target.checked;
    let cbs: Array<HTMLInputElement> = this.elRef.nativeElement.querySelectorAll('.list.content .app>.selector input');
    let allSelector = this.elRef.nativeElement.querySelector(".select-all .selector.all-apps input");
    if(app === "ALL"){
      this.selectedApps = [];
      
      if(checked){
        for(let cb of cbs){
          cb.checked = true;
        }
        for(let e of this.newEnv.env.services){
          this.selectedApps.push(e.id);
        }
      }
      else {
        for(let cb of cbs){
          cb.checked = false;
        }
      }
    }
    else {
      if(checked){
        if(!this.selectedApps.includes(app)){
          this.selectedApps.push(app);
        }
        if(this.selectedApps.length == cbs.length){
          allSelector.checked = true;
        }
      }
      if(!checked){
        allSelector.checked = false;
        if(this.selectedApps.includes(app)){
          this.selectedApps.splice(this.selectedApps.findIndex(item => item == app), 1);
        }
      }
    }

    console.log(this.selectedApps);
  }

  toggleSidebar(sidebarContext){
    this.sb.toggle(sidebarContext);
  }

  deleteApps(){
    this.newEnv.env.services = this.newEnv.env.services.filter(item => {
      for(let a of this.selectedApps){
        if(item.id == a)
          return false;
      }
      return true;
    });
    this.selectedApps = [];
  }

  validateApps(){
    this.router.navigate(['../', 'configure'], {relativeTo: this.route});
  }

  ngOnInit() {
  }
}
