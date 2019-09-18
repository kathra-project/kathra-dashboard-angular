import { Injectable } from '@angular/core';
import { K8sWsService } from '../../kathra-data/services/k8s-ws.service';
import { 
  Component as KathraModelComponent,
  ApiVersion as KathraModelApiVersion,
  Implementation as KathraModelImplementation,
  ComponentsService,
  ApiVersionsService
} from '../../appmanager'
import { KathraComponent } from '../components/kathra/kathra.component';

@Injectable()
export class NewAppService {

  component: KathraModelComponent;
  api: KathraModelApiVersion;
  apiFile: Blob;
  implem: KathraModelImplementation;

  creationStep: number = 1;

  constructor(
    private k8sModel: K8sWsService,
    private compSvc: ComponentsService,
    private apiVerSvc: ApiVersionsService
  ) { }

  createComponent(comp: KathraModelComponent){
    return this.compSvc.createComponent(comp);
  }

  createApi(componentId: string, apiFile: Blob){
    return this.apiVerSvc.createApiVersion(componentId, apiFile /* SwaggerApiFile */);
  }

  updateApi(apiVersionId: string, apiFile: Blob){
    return this.apiVerSvc.updateApiVersion(apiVersionId, apiFile);
  }

  reset(){
    this.component = {};
    this.api = {};
    this.implem = {};
  }
}
