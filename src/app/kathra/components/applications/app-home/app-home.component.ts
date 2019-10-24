import { Component, OnInit, ElementRef } from '@angular/core';
import {trigger, transition, style, animate, state} from '@angular/animations';
import { FormGroup, FormControl } from '@angular/forms';
import { ComponentsService, ImplementationsService, Component as KathraComponent } from '../../../../appmanager';
import { ToolsService } from '../../../../kathra-tools';
import { Implementation } from '../../../../appmanager';
import { Router, ActivatedRoute } from '@angular/router';
import { KathraUserService } from '../../../../kathra-user';
import { CustomNotificationsService } from '../../../../kathra-tools/services/custom-notifications.service';
@Component({
  selector: 'kathra-app-home',
  animations: [
    trigger(
      'hidingAnimation', [
        transition(
          ':enter', [
            style({height: '0', opacity: 0}),
            animate('80ms linear', style({height: 'unset', 'opacity': 1}))
          ]
        ),
        transition(
          ':leave', [
            style({height: 'unset', 'opacity': 1}),
            animate('80ms linear', style({height: '0', 'opacity': 0}))
          ]
        )
      ]
    )
  ],
  templateUrl: './app-home.component.pug',
  styleUrls: ['./app-home.component.scss']
})
export class AppHomeComponent implements OnInit {

  filter: string = "";
  ownerForm: FormGroup;
  selectedTab: string = "components";
  sort = {
    prop: 'name',
    asc: true
  };

  components: Array<KathraComponent> = [];
  implementations: Array<Implementation> = [];

  constructor(
    private user: KathraUserService,
    private tools: ToolsService,
    private implemSvc: ImplementationsService,
    private compSvc: ComponentsService,
    private router: Router,
    private route: ActivatedRoute,
    private notifs: CustomNotificationsService,
    private el: ElementRef
  ) { 

    this.route.fragment.subscribe(fragment =>{
      if(fragment)
        this.selectedTab = fragment;
      else
        this.selectedTab = "components"
    });
  }

  selectTab(tab: string) {
    //this.selectedTab = tab;
    this.router.navigate([], {relativeTo: this.route, fragment: tab})
  }

  refreshFilters(){
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

  get filteredComps() {
    let filteredComps = [];
    for(let k in this.components) {
      if(this.tools.objContainsString(this.components[k], this.filter)){
        filteredComps.push(this.components[k]);
      }
    }
    return filteredComps.sort((a, b) => this.tools.objSortByKey(a, b, this.sort.prop, this.sort.asc));
  }

  get filteredImplems() {
    let filteredImplems = [];
    for(let k in this.implementations ){
      if(this.tools.objContainsString(this.implementations[k], this.filter)){
        filteredImplems.push(this.implementations[k]);
      }
    }
    return filteredImplems.sort((a, b) => this.tools.objSortByKey(a, b, this.sort.prop, this.sort.asc));
  }

  extractTeams(target){
    let teams = [];
    target.forEach(function(item, idx, arr){
      if(item['metadata']){
        if(!teams.includes(item['metadata']['groupPath'])) teams.push(item['metadata']['groupPath'])
      }
    });
    if(this.sort.prop == "owner" && !this.sort.asc){
      return teams.sort().reverse();
    }
    else{ 
      return teams.sort();
    }
  }

  filteredByTeam(team: string, target){
    return target.filter(item => item['metadata']['groupPath'] == team);
  }

  filteredByOwner(target) {
    return target.filter(item => item['createdBy'] == this.user.info.preferred_username);
  }

  findComponent(implementation){
    return this.components.find(component => component.id == implementation.component.id);
  }

  ngOnInit() {
    this.implemSvc.getImplementations().subscribe((data) => {
      this.implementations = data;
    }, (err) => {
      this.implementations = [];
    });
    
    this.compSvc.getComponents().subscribe((data) => {
      this.components = data;
      this.el.nativeElement.querySelector('.loader').classList.add("hidden");
    }, (err) => {
      this.components = [];
      this.notifs.error("Exception",  "An error happened while retrieving the components. Please check the permissions and groups of the current user." );
      this.el.nativeElement.querySelector('.loader').classList.add("hidden");
    });

    this.ownerForm = new FormGroup({
      owner: new FormControl("me")
    })
  }
}
