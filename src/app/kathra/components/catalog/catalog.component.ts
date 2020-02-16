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
import { Observable, forkJoin } from 'rxjs';

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

  currentPage: number = 0;
  pageSize: number = 40;
  pagesCount: number = 0;
  teams = [];
  filteredApps: Array<K8sApplication> = this.k8sModel.k8sApplications;
  catalogEntries: Array<CatalogEntry>; 
  catalogEntriesFiltred: Array<CatalogEntry>; 

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
    let index = 0;
    this.catalogEntriesFiltred = []
    for(var i in this.catalogEntries) {
      var entry = this.catalogEntries[i];
      if (!this.filter || (entry && entry.name && entry.name.match(this.filter))) {
          if (index >= this.pageSize*this.currentPage && index < this.pageSize*(this.currentPage+1)) {
          this.catalogEntriesFiltred.push(entry);
          }
          index++;
      }
    }
    this.pagesCount = index/this.pageSize;
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

  next() {
    this.currentPage++;
    this.refreshFilters();
  }
  previous() {
    this.currentPage--;
    this.refreshFilters();
  }

  filterCat($event, cat:string){
    let cats = <NodeListOf<HTMLElement>>document.querySelectorAll('kathra-catalog .catalog-content .cat-filter a.cat');
    for(let i=0; i<cats.length; i++){
      cats[i].classList.remove('selected');
    }
    $event.currentTarget.classList.add('selected');
    this.catFilter = cat;
  }

  loadDetails(catalogEntry: CatalogEntry){
    if (!catalogEntry || !catalogEntry.packages || !catalogEntry.packages[0]) {
      console.warn(catalogEntry)
      return;
    }
    this.focusedCatalogEntry = catalogEntry;
    this.loadCatalogEntryPackage(catalogEntry.packages[0]);
    this.modals.open("app-details");
  }

  loadCatalogEntryPackage(catalogEntryPackage: CatalogEntryPackage) {
    this.focusedCatalogEntryPackage = catalogEntryPackage;
    this.catalogEntriesSvc.getCatalogEntryPackageFromProviderId(this.focusedCatalogEntryPackage.providerId).subscribe(item => {
      this.focusedCatalogEntryPackage = item;
      this.focusedCatalogEntryPackageVersion = this.focusedCatalogEntryPackage.versions[0];
      this.loadCatalogEntryPackageVersion(this.focusedCatalogEntryPackageVersion.version)
    });
  }

  loadCatalogEntryPackageVersion(version: string) {
    this.focusedCatalogEntryPackageVersion.documentation = "loading..."
    this.catalogEntriesSvc.getCatalogEntryPackageFromProviderIdAndVersion(this.focusedCatalogEntryPackage.providerId, version).subscribe(item => {
      console.log(item)
      this.focusedCatalogEntryPackageVersion = item.versions[0];
    })
  }

  ngOnInit() {
    this.sbService.closeAll();

    let entries = this.catalogEntriesSvc.getCatalogEntries();
    let packages = this.catalogEntriesSvc.getCatalogEntryPackages();
    forkJoin([entries, packages]).subscribe(results => {
      this.catalogEntries = results[0];
      this.catalogEntries.forEach(entry => {
        entry.packages = entry.packages.map(pckg => {
          let pckgFound = results[1].find(i => i.providerId === pckg.providerId);
          return pckgFound ? pckgFound : pckg;
        })
      });
      this.refreshFilters();

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
