import { Component, Input, DoCheck, ElementRef } from '@angular/core';
import { K8sWsService, K8sEnvironment } from '../../../../kathra-data';
import { ToolsService } from '../../../../kathra-tools';
import { KathraEnvComponent } from '../../../../kathra-data';
import { ModalComponent, ModalsService } from '../../../../kathra-modals';

@Component({
  selector: 'kathra-env-home',
  templateUrl: './env-home.component.pug',
  styleUrls: ['./env-home.component.scss'],
  providers: [ModalsService]
})
export class EnvHomeComponent {

  filter: string;
  selectedEnvs: Array<string> = [];
  focusedEnv: K8sEnvironment;

  sort = {
    prop: 'name',
    asc: true
  };

  constructor(
    private k8sModel: K8sWsService,
    private tools: ToolsService,
    private elRef: ElementRef,
    private modals: ModalsService
  ) { this.filter = "" }

  get instanciatingEnvironments(){
    let filteredEnvs = [];
    for(let k in this.k8sModel.k8sEnvironments ){
      if(this.k8sModel.k8sEnvironments[k].status == 'DEPLOYING' && this.tools.objContainsString(this.k8sModel.k8sEnvironments[k], this.filter)){
        filteredEnvs.push(this.k8sModel.k8sEnvironments[k]);
      }
    }
    return filteredEnvs.sort((a, b) => this.tools.objSortByKey(a, b, this.sort.prop, this.sort.asc));
  }

  get runningEnvironments(){
    let filteredEnvs = [];
    for(let k in this.k8sModel.k8sEnvironments ){
      if(this.k8sModel.k8sEnvironments[k].status == 'AVAILABLE' && this.tools.objContainsString(this.k8sModel.k8sEnvironments[k], this.filter)){
        filteredEnvs.push(this.k8sModel.k8sEnvironments[k]);
      }
    }
    return filteredEnvs;
  }

  get crashedEnvironments(){
    let filteredEnvs = [];
    for(let k in this.k8sModel.k8sEnvironments){
      if(this.k8sModel.k8sEnvironments[k].status == 'BROKEN' && this.tools.objContainsString(this.k8sModel.k8sEnvironments[k], this.filter)){
        filteredEnvs.push(this.k8sModel.k8sEnvironments[k]);
      }
    }
    return filteredEnvs;
  }

  get sortedEvents(){
    let sortedEvs = this.focusedEnv.events.sort(function(a, b){
      if(a.lastTimestamp > b.lastTimestamp)
        return -1;
      else if(a.lastTimestamp < b.lastTimestamp)
        return 1;
      else 
        return 0;
    });
    return sortedEvs;
  }

  get environmentServices(){
    let services = Object.assign([], this.focusedEnv ? this.focusedEnv.services : [])
    return services;
  }

  getClassForStatus(serviceStatus){
    return serviceStatus.toLowerCase();
  }

  updateSort(prop: string){
    if(this.sort.prop == prop){
      this.sort.asc = !this.sort.asc;
    }
    else {
      this.sort.prop = prop;
      this.sort.asc = true;
    }
  }

  convertTime(timestamp){
    let pastDate = new Date(timestamp);
    let now = new Date();

    return Math.ceil((now.getTime() - pastDate.getTime())/1000)
  }

  updateSelection($event, env: string){
    let checked = $event.target.checked;
    let cbs: Array<HTMLInputElement> = this.elRef.nativeElement.querySelectorAll('.tabs.content .envs .env>.selector input');
    let allSelector = this.elRef.nativeElement.querySelector(".select-all .selector.all-envs input");
    if(env === "ALL"){
      this.selectedEnvs = [];
      
      if(checked){
        for(let cb of cbs){
          cb.checked = true;
        }
        for(let e in this.k8sModel.k8sEnvironments){
          this.selectedEnvs.push(e);
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
        if(!this.selectedEnvs.includes(env)){
          this.selectedEnvs.push(env);
        }
        if(this.selectedEnvs.length == cbs.length){
          allSelector.checked = true;
        }
      }
      if(!checked){
        allSelector.checked = false;
        if(this.selectedEnvs.includes(env)){
          this.selectedEnvs.splice(this.selectedEnvs.findIndex(item => item == env), 1);
        }
      }
    }
  }

  deleteEnvs(){
    for(let env of this.selectedEnvs){
      this.k8sModel.deletePlatform(env);
    }
    this.selectedEnvs = [];
  }

  saveEnvs(){
    //todo
  }

  loadDetails(envName){
    this.focusedEnv = this.k8sModel.k8sEnvironments[envName];
    this.modals.open("env-details");
  }

  ngDoCheck() {
    if(this.focusedEnv){
      if(this.k8sModel.k8sEnvironments[this.focusedEnv.name])
        this.focusedEnv.services = this.k8sModel.k8sEnvironments[this.focusedEnv.name].services;
    }
  }
}
