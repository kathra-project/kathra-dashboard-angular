import { Component, Input, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

import { KathraUserService } from '../../../kathra-user';
import { K8sWsService, K8sApplication, KathraAppComponent } from '../../../kathra-data';
import { MulticritInputFilterComponent, ColorPickerService } from '../../../kathra-tools';
import { SidebarsService } from '../../../kathra-sidebars';
import { ModalComponent, ModalsService } from '../../../kathra-modals';
import { CatalogEntriesService, CatalogEntryPackage, CatalogEntryPackageVersion, CatalogEntry, GroupsService, Group } from '../../../appmanager';
import { group } from '@angular/animations';

@Component({
  selector: 'kathra-catalog',
  templateUrl: './catalog.component.pug',
  styleUrls: ['./catalog.component.scss'],
  providers: [ModalsService]
})
export class CatalogComponent implements OnInit {
  sources: FormGroup;
  focusedCatalogEntry: CatalogEntry;
  focusedCatalogEntryPackage: CatalogEntryPackage;
  focusedCatalogEntryPackageVersion: CatalogEntryPackageVersion;
  filter: string = "";
  filters = {
    cat: undefined,
    team: undefined,
    none: undefined
  };

  teams = [];
  filteredApps: Array<K8sApplication> = this.k8sModel.k8sApplications;
  catalogEntries: Array<CatalogEntryPackage>; 
  catalogEntriesFiltred: Array<CatalogEntryPackage>; 

  @Input() 
  data: {};
  nameFilter: string = "";
  catFilter: string = "all";
  displayMode = 'by-cat';

  constructor(
    private catalogEntriesSvc: CatalogEntriesService,
    private k8sModel: K8sWsService,
    private user: KathraUserService,
    private groupsService: GroupsService,
    private sbService: SidebarsService,
    private colorPick: ColorPickerService,
    private modals: ModalsService
  ) { }

  updateFilters($event){
    this.filters = $event;
    this.refreshFilters();
  }
  refreshFilters(){
    this.catalogEntriesFiltred = []
    for(var i in this.catalogEntries) {
      var entry = this.catalogEntries[i];
      if (!this.filter) {
          this.catalogEntriesFiltred.push(entry);
      } else if (entry.catalogEntry && entry.catalogEntry.name && entry.catalogEntry.name.match(this.filter)) {
          this.catalogEntriesFiltred.push(entry);
      }
    }
  }

  hasAllKeywords(app, keywords){
    if(keywords){
      for(let kw of keywords){
        if(!app.id.toLowerCase().includes(kw.toLowerCase()) && 
           !app.name.toLowerCase().includes(kw.toLowerCase()) && 
           !app.teaser.toLowerCase().includes(kw.toLowerCase()) && 
           !app.description.toLowerCase().includes(kw.toLowerCase())){
            return false;
        }
      }
    }
    return true;
  }

  toggleList(listName: string){
    document.querySelector(`.list:not(.${listName})`).classList.remove('active');
    document.querySelector(`.${listName}.list`).classList.toggle('active');
  }

  changeDisplayMode(){
    if(this.displayMode == 'by-cat'){
      this.displayMode = 'as-grid';
    }
    else{
      this.displayMode = 'by-cat';
    }
  }

  filterCat($event, cat:string){
    let cats = <NodeListOf<HTMLElement>>document.querySelectorAll('kathra-catalog .catalog-content .cat-filter a.cat');
    for(let i=0; i<cats.length; i++){
      cats[i].classList.remove('selected');
    }
    $event.currentTarget.classList.add('selected');
    this.catFilter = cat;
  }

  loadDetails(catalogEntryPackage: CatalogEntryPackage){
    this.focusedCatalogEntry = catalogEntryPackage.catalogEntry;
    this.focusedCatalogEntryPackage = catalogEntryPackage;
    this.focusedCatalogEntryPackageVersion = catalogEntryPackage.versions[0];

    this.catalogEntriesSvc.getCatalogEntryPackageFromProviderId(this.focusedCatalogEntryPackage.providerId).subscribe(item => {
      this.focusedCatalogEntryPackage = item;
    })
    this.loadCatalogEntryPackageVersion(this.focusedCatalogEntryPackageVersion.version)
    this.modals.open("app-details");
  }

  loadCatalogEntryPackageVersion(version: string) {
    this.focusedCatalogEntryPackageVersion.documentation = "loading..."
    this.catalogEntriesSvc.getCatalogEntryPackageFromProviderIdAndVersion(this.focusedCatalogEntryPackage.providerId, version).subscribe(item => {
      this.focusedCatalogEntryPackageVersion = item.versions[0];
    })
  }

  ngOnInit() {
    this.sbService.closeAll();


    this.catalogEntriesSvc.getCatalogEntryPackages().subscribe((data) => {
      this.catalogEntries = data;
      this.catalogEntriesFiltred = data
    }, (err) => {
      this.catalogEntries = [];
    });

    this.teams = [];
    this.groupsService.getGroups().subscribe((data) =>  {
      this.teams = data.map(group => group.name);
    })
    this.filteredApps = this.k8sModel.k8sApplications;

    this.sources = new FormGroup({
      internal: new FormControl(true),
      external: new FormControl(true)
    })
  }

}
