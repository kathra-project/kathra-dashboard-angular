import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CustomNotificationsService } from '../../../../kathra-tools/services/custom-notifications.service';
import { timer } from 'rxjs';
import { KathraElementStatusService } from '../../../../kathra-tools';
import { CatalogEntryTemplate, CatalogEntriesService, GroupsService, Group, ImplementationsService, ImplementationVersion, Implementation, CatalogEntry } from 'src/app/appmanager';

@Component({
  selector: 'kathra-new-catalogentry',
  templateUrl: './new-catalogentry.component.pug',
  styleUrls: ['./new-catalogentry.component.scss']
})
export class NewCatalogEntryComponent implements OnInit {

  basicInfoForm: FormGroup;
  templates: Array<CatalogEntryTemplate>; 
  templateSelected : CatalogEntryTemplate;
  groups : Array<Group> ;
  implementations : Array<Implementation> ;
  implementationVersions : Array<ImplementationVersion>;

  submiting: Boolean;

  catalogEntryCreated: CatalogEntry

  constructor(
    private formBuilder: FormBuilder,
    private catalogEntriesSvc: CatalogEntriesService,
    private groupsService: GroupsService,
    private notifs: CustomNotificationsService,
    private implementationsService: ImplementationsService,
    private kathraStatus: KathraElementStatusService
  ) { }
  
  selectTemplate(templateName: CatalogEntryTemplate) {
    var formGroup = {
      template: new FormControl("")
    }
    this.templates.find(t => t.name == templateName).arguments.forEach(function(argument){
      formGroup[argument.key] = new FormControl("")
    })
    this.basicInfoForm = this.formBuilder.group(formGroup);
    this.templateSelected = this.templates.find(t => t.name == templateName);
  }

  selectImplementation(implementationId: string) {
    this.implementationsService.getImplementationById(implementationId).subscribe((data) => {
      this.implementationVersions = data.versions
    }, (err) => {
    });
  }

  addEntry() {
    if (this.submiting || !this.isValidForm() || !this.templateSelected) {
      return;
    }
    var values = this.basicInfoForm.value;
    this.templateSelected.arguments.forEach(function(argument) {
      argument.value = values[argument.key]
    });
    
    this.submiting = true;
    this.catalogEntriesSvc.addEntryToCatalogFromTemplate(this.templateSelected).subscribe((catalogEntry) => {
      this.catalogEntryCreated = catalogEntry;
      this.notifs.success("Catalog entry creating",  "Catalog entry '" + this.catalogEntryCreated.name + "' is creating");
      this.checkStatus();
    }, (err) => {
      this.notifs.error("Exception", err);
      this.submiting = false;
    });
  }

  checkStatus(){
    let subscription = timer(0, 3000).subscribe( x => {
      this.catalogEntriesSvc.getCatalogEntry(this.catalogEntryCreated.id).subscribe((catalogEntry) => {
        if (this.kathraStatus.isReady(catalogEntry)) {
          this.notifs.success("Catalog entry created",  "Catalog entry '" + this.catalogEntryCreated.name + "' has been created successfully");
          subscription.unsubscribe();
          this.submiting = true;
        }
        if (this.kathraStatus.isError(catalogEntry)) {
          this.notifs.error("Error",  "An error happened while creating the catalog entry " + this.catalogEntryCreated.name );
          subscription.unsubscribe();
          this.submiting = true;
        }
      });
    });
  }

  isValidForm() {
    

    return true;
  }

  ngOnInit() {
    this.submiting = false;
    this.implementationVersions = [];
    this.basicInfoForm = new FormGroup({
      template: new FormControl("")
    })
    this.implementationsService.getImplementations().subscribe((data) => {
      this.implementations = data;
    }, (err) => {
      this.implementations = [];
    });
    this.groupsService.getGroups().subscribe((data) => {
      this.groups = data;
    }, (err) => {
      this.groups = [];
    });
    this.catalogEntriesSvc.getCatalogEntryTemplates().subscribe((data) => {
      this.templates = data;
    }, (err) => {
      this.templates = [];
    });
  }
}
