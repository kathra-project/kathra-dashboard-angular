import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewAppService } from '../../../services/new-app.service';
import { ToolsService } from '../../../../kathra-tools';
import { Implementation } from '../../../../appmanager';
import { KathraElementStatusService } from '../../../../kathra-tools';

import {
  Component as KathraModelComponent,
  ComponentsService,
  ImplementationsService,
  ApiVersionsService
} from '../../../../appmanager'

@Component({
  selector: 'kathra-component-details',
  templateUrl: './component-details.component.pug',
  styleUrls: ['./component-details.component.scss']
})
export class ComponentDetailsComponent implements OnInit {

  comp: KathraModelComponent;
  implementations: Array<Implementation> = [];
  currentVersion: any;
  yamlApi: any;

  constructor(
    private compSvc: ComponentsService,
    private implSvc: ImplementationsService,
    private apiVerSvc: ApiVersionsService,
    private router: Router,
    private route: ActivatedRoute,
    private newApp: NewAppService,
    private tools: ToolsService,
    private el: ElementRef,
    private kathraStatus: KathraElementStatusService
  ) { }
  
  get latestVersion(){
    if(this.comp && this.comp.versions)
      return this.comp.versions.sort((a,b) => this.tools.objSortByVersions(a,b, 'version', true))[this.comp.versions.length - 1 ]
    else 
      return null;
  }

  get otherApiVersions(){
    if(this.comp && this.comp.versions)
      return this.comp.versions.filter(item => item.version != this.currentVersion.version).sort((a,b) => this.tools.objSortByVersions(a,b, 'version', true));
    else 
      return null;
  }

  updateCurrentApiFile(idAPICurrentVersion){
    this.apiVerSvc.getApiFile(idAPICurrentVersion).subscribe(apiFile => {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.yamlApi = reader.result;
        this.el.nativeElement.querySelector('.yaml .loader').classList.add("hidden");
      }
      reader.readAsText(apiFile);
    })
  }

  refreshAPIVersion(idAPIVersion) {
    this.currentVersion =  this.comp.versions.filter(item => item.id == idAPIVersion)[0]
    this.el.nativeElement.querySelector('.yaml .loader').classList.remove("hidden");
    this.updateCurrentApiFile(idAPIVersion);
  }

  createNewApi(){
    this.newApp.reset();
    this.newApp.creationStep = 2;
    this.newApp.component = this.comp;

    this.router.navigate(["/", "kathra", "applications", "new", "api"]);
  }

  updateCurrentApi(){
    this.newApp.reset();
    this.newApp.creationStep = 2;
    this.newApp.component = this.comp;
    this.newApp.api = this.currentVersion;

    this.router.navigate(["/", "kathra", "applications", "update", "api"]);
  }

  createNewImplem(){
    this.newApp.reset();
    this.newApp.creationStep = 3;
    this.newApp.component = { id: this.comp.id, name: this.comp.name };

    this.newApp.api.id = this.currentVersion.id;
    this.newApp.api.version = this.currentVersion.version;

    this.router.navigate(["/", "kathra", "applications", "new", "implementation"]);
  }

  ngOnInit(){

    this.route.params.subscribe(params => {
      
      this.compSvc.getComponentById(params['id']).subscribe(item => {
        this.comp = item;

        this.currentVersion = this.latestVersion
        this.updateCurrentApiFile(this.currentVersion.id)
      })

      this.implSvc.getComponentImplementations(params['id']).subscribe(implementations => {
        this.implementations = implementations;
        this.el.nativeElement.querySelector('.implems-list .loader').classList.add("hidden");
      })
    });
  }
}
