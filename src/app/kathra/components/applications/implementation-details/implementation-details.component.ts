import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImplementationsService, Implementation, ApiVersion, RepositoriesService, ComponentsService} from '../../../../appmanager';
import { ColorPickerService } from '../../../../kathra-tools';
import { version } from 'punycode';
import { ToolsService } from '../../../../kathra-tools';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../../app.config';

@Component({
  selector: 'kathra-implementation-details',
  templateUrl: './implementation-details.component.pug',
  styleUrls: ['./implementation-details.component.scss']
})
export class ImplementationDetailsComponent implements OnInit {

  defaultCurentBranchs: Array<String> = ['master', 'dev'];
  implem: Implementation;
  apiVersion: ApiVersion;
  branches: Array<String> = [];
  currentBranch: String;
  status: String;

  constructor(
    private http: HttpClient,
    private tools: ToolsService,
    private route: ActivatedRoute,
    private colorPick: ColorPickerService,
    private el: ElementRef,
    private config: AppConfig,
    private compSvc: ComponentsService,
    private implemSvc:  ImplementationsService,
    private repositorySvc: RepositoriesService
  ) { this.status = "unknown" }

  implementatonLoaded(){
    let loader:HTMLElement = this.el.nativeElement.querySelector('.dimmable .dimmer');
    loader.classList.remove('active')
  }

  updateCurrentBranch(branch){
    this.currentBranch = branch
    this.updateServiceStatus()
  }

  getApiVersion() {
    return this.implem.component.versions.sort((a,b) => this.tools.objSortByVersions(a,b, 'version', true))[this.implem.component.versions.length - 1 ]
  }

  getUrl() {
    let domain = this.config.getConfig("service_domain")
    let swaggerPath = "/api/v1/swagger.json"
    let url = "";
    if(this.implem != null){
      let sufix="-"+this.currentBranch;
      if (this.currentBranch == "master") {
        sufix = ""
      }
      url = "https://" + this.implem.name + "-" + this.getEnvName() + sufix + "-svc." + domain + swaggerPath
    }
    return url.toLowerCase();
  }

  updateServiceStatus() {
    this.status = "unknown"
    this.http.get(this.getUrl()).subscribe(
        response => this.status = "available",
        error => this.status = "stopped" );
  }

  getEnvName(){
    return this.implem.metadata.groupPath.split("/")[2];
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.currentBranch = null;

      this.implemSvc.getImplementationById(params['implemId']).toPromise().then(item => {
        this.implem = item;

        this.repositorySvc.getRepositoryBranches(this.implem.sourceRepository.id).toPromise().then(branchs => {
          this.branches = branchs
          let defaultBranchFound = this.defaultCurentBranchs.find(defaultBranch => this.branches.includes(defaultBranch));
          if (defaultBranchFound.length) {
            this.currentBranch = defaultBranchFound;
          }
        });

        this.compSvc.getComponentById(this.implem.component.id).toPromise().then(component => {
          this.implem.component = component
          this.apiVersion = this.getApiVersion()
          this.updateServiceStatus()
        });

        this.implementatonLoaded();
      })

    });
  }

}
