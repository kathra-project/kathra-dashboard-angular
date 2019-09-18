import { Injectable } from '@angular/core';
import { K8sEnvironment, K8sApplication, K8sWsService } from '../../kathra-data';
//import { DefaultService as AppManager } from '../../appmanager';

@Injectable()
export class NewEnvService {

  env: any = {
    name: '',
    owner: '',
    services: [],
    tags: []
  };

  constructor(
    private k8sModel: K8sWsService
  ) { }

  addServices(svcs: Array<K8sApplication>){
    for(let svc of svcs){
      let notPresent = true;

      for(let app of this.env.services){
        if(svc.id === app.id){
          notPresent = false;
        }
      }
  
      if(notPresent){
        this.env.services.push(svc);
      }
    }
  }

  reset(){
    this.env = {
      name: '',
      owner: '',
      services: [],
      tags: []
    }
  }
}
