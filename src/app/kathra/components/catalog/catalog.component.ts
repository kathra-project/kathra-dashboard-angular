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
  licence: FormGroup;
  focusedCatalogEntry: CatalogEntry;
  focusedCatalogEntryPackage: CatalogEntryPackage;
  focusedCatalogEntryPackageVersion: CatalogEntryPackageVersion;
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

  public appsCategories(filtered?: boolean): Array<string> {
    let cats: Array<string> = [];
    let ref = filtered? this.filteredApps : this.k8sModel.k8sApplications;

    for(let app of ref){
      if(!cats.includes(app.categories[0])){
        cats.push(app.categories[0]);
      }
    }

    return cats;
  }
  
  public appsCategoriesByChar(full?:boolean): {[key: string]: Array<string>} {
    return {"xx" : ['xx'] };
    let cats = this.appsCategories(true).sort();
    
    let byChar;
    
    if(full){
      byChar = {
        a: null, b:null, c: null, d:null, e: null, f:null, g: null, h:null, i: null, j:null, k: null, l:null, m: null,
        n: null, o: null, p:null, q: null, r:null, s: null, t:null, u: null, v:null, w: null, x:null, y: null, z: null
      }
    }
    else {
      byChar = {}
    }

    for(let cat of cats){
      let firstChar = cat[0];
      
      if(!byChar[firstChar]){
        byChar[firstChar] = [];
      }
      byChar[firstChar].push(cat)
    }
    
    return byChar;
  }

  public appsTeamsByChar(full?:boolean): {[key: string]: Array<string>} {
    let teams = this.teams.sort();
    let byChar;
    
    if(full){
      byChar = {
        a: null, b:null, c: null, d:null, e: null, f:null, g: null, h:null, i: null, j:null, k: null, l:null, m: null,
        n: null, o: null, p:null, q: null, r:null, s: null, t:null, u: null, v:null, w: null, x:null, y: null, z: null
      }
    }
    else {
      byChar = {}
    }

    for(let team of teams){
      let firstChar = team[0];
      
      if(!byChar[firstChar]){
        byChar[firstChar] = [];
      }
      byChar[firstChar].push(team)
    }
    
    return byChar;
  }

  catalogAppsByCat(string): Array<K8sApplication>{
    let byCatApps: Array<K8sApplication> = [];
    for(let app of this.filteredApps){
      if(app.categories[0] == string){
        byCatApps.push(app);
      }
    }
    return byCatApps;
  }

  updateFilters($event){
    this.filters = $event;
    this.refreshFilters();
  }
  refreshFilters(){
    if (!this.filters && !this.filters.none && this.filters.none.length == 0 && this.filters.team.length == 0) {
      this.catalogEntriesFiltred = this.catalogEntries;
    } else {
      this.catalogEntriesFiltred = []
      for(var entry in this.catalogEntries) {
        if (this.filters.none && this.filters.none.some(keywork => this.catalogEntries[entry].catalogEntry.name.match(keywork))) {
          this.catalogEntriesFiltred.push(this.catalogEntries[entry])
        }
      }
    }

  }

  refreshFiltersOld(){
    // Update visible content depending on filters provided
    // {cat: [], team: []; none: []}
    let sources = {
      irtsystemx: this.licence.controls.irtsystemx.value,
      opensource: this.licence.controls.opensource.value,
      partners: this.licence.controls.partners.value
    };
    let catCandidates = [];
    let teamCandidates = [];
    let finalCandidates = [];

    // Apps with a category in cat
    if(this.filters.cat){
      for(let app of this.k8sModel.k8sApplications){
        if(this.filters.cat.includes(app.categories[0])){
          catCandidates.push(app);
        }
      }
    } else {
      catCandidates = this.k8sModel.k8sApplications;
    }
    // Apps with a team in team
    /* if(this.filters.team){
      for(let app of this.k8sModel.k8sApplications){
        if(!this.filters.team.includes(app.group)){
          teamCandidates.push(app);
        }
      }
    } else {
      teamCandidates = this.k8sModel.k8sApplications;
    } */

    for(let app of catCandidates){
      //for(let app2 of teamCandidates){
        //if(app.id == app2.id){
          if(this.hasAllKeywords(app, this.filters.none)){
            finalCandidates.push(app);
          }
        //}
      //}
    }
    if(!sources.opensource && !sources.partners && !sources.irtsystemx){
      this.filteredApps = finalCandidates;
    }
    else {
      this.filteredApps = finalCandidates.filter(function(item){
        for(let src in sources){
          if(sources[src] && item.licence == src){
            return true;
          }
        }
      });
    }

    console.log("Filtered apps :", this.filteredApps);
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
    this.loadCatalogEntryPackageVersion(this.focusedCatalogEntryPackageVersion)
    this.modals.open("app-details");
  }

  loadCatalogEntryPackageVersion(catalogEntryPackageVersion: CatalogEntryPackageVersion) {
    this.focusedCatalogEntryPackageVersion.documentation = "loading..."
    this.catalogEntriesSvc.getCatalogEntryPackageFromProviderIdAndVersion(this.focusedCatalogEntryPackage.providerId, catalogEntryPackageVersion.version).subscribe(item => {
      this.focusedCatalogEntryPackageVersion = item.versions[0];
    })
  }

  ngOnInit() {
    this.sbService.closeAll();


    this.catalogEntriesSvc.getCatalogEntryPackages().subscribe((data) => {
      this.catalogEntries = data;
      this.catalogEntriesFiltred = data
      console.log("Filtered apps :", this.catalogEntries);
    }, (err) => {
      this.catalogEntries = [];
    });

    this.teams = [];
    this.groupsService.getGroups().subscribe((data) =>  {
      this.teams = data.map(group => group.name);
    })
    this.filteredApps = this.k8sModel.k8sApplications;

    this.licence = new FormGroup({
      internal: new FormControl(true),
      external: new FormControl(true)
    })
  }

}
