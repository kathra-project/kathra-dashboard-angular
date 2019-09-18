import { Component, OnInit, ElementRef } from '@angular/core';
import { K8sWsService, KathraAppComponent } from '../../../../kathra-data';
import { NewEnvService } from '../../../services/new-env.service';
import { SidebarsService } from '../../../../kathra-sidebars';

@Component({
  selector: 'kathra-catalogue-explorer',
  templateUrl: './catalogue-explorer.component.pug',
  styleUrls: ['./catalogue-explorer.component.scss']
})
export class CatalogueExplorerComponent implements OnInit {

  filterValue: string = "";
  selectedApps: Array<string> = [];

  constructor(
    private elRef: ElementRef,
    private newEnv: NewEnvService,
    private k8sModel: K8sWsService,
    private sb: SidebarsService
  ) { }

  addSelectedAppsToEnv(){
    this.newEnv.addServices(
      this.k8sModel.k8sApplications.filter(item => this.selectedApps.includes(item.id))
    );
    this.resetValues();
  }

  updateSelection($event, app){
    let checked = $event.target.checked;
    let cbs: Array<HTMLInputElement> = this.elRef.nativeElement.querySelectorAll('.tab-content .apps .app>.selector input');
    let allSelector = this.elRef.nativeElement.querySelector(".select-all .selector.all-apps input");
    if(app === "ALL"){
      this.selectedApps = [];
      
      if(checked){
        for(let cb of cbs){
          cb.checked = true;
        }
        for(let a of this.k8sModel.k8sApplications){
          this.selectedApps.push(a.id);
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

  get filteredApps(){
    if(!this.filterValue || this.filterValue === ""){
      return this.k8sModel.k8sApplications;
    }
    else {
      return this.k8sModel.k8sApplications.filter(item => item.name.toLocaleLowerCase().includes(this.filterValue.toLowerCase()))
    }
  }

  resetValues(){
    let cbs: Array<HTMLInputElement> = this.elRef.nativeElement.querySelectorAll('.tab-content > * .selector input');
    for(let cb of cbs){
      cb.checked = false;
    }
    this.selectedApps = [];
    this.filterValue = "";
    this.elRef.nativeElement.querySelector('.content .search input').focus();
  }


  ngOnInit() {
    this.resetValues();
    this.sb.statusChange.subscribe((status)=>{
      if(status.sidebar == "sb_catalogue-explorer"){
        if(status.action == 'close' || status.action == 'open'){
          console.debug(status);
          this.resetValues();
        }
      }
    })
  }
}
