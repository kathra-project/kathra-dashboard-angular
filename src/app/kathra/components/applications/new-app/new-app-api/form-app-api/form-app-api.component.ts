import { Component, OnInit, ElementRef } from '@angular/core';
import { NewAppService } from '../../../../../services/new-app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiVersionsService, DefaultService as AppManagerService } from '../../../../../../appmanager';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomNotificationsService } from '../../../../../../kathra-tools/services/custom-notifications.service';
import * as YAML from 'js-yaml';
import { Observable, timer, pipe } from 'rxjs';
import { KathraElementStatusService } from '../../../../../../kathra-tools';

@Component({
  selector: 'kathra-form-app-api',
  templateUrl: './form-app-api.component.pug',
  styleUrls: ['./form-app-api.component.scss']
})

export class FormAppApiComponent implements OnInit {

  apiForm: FormGroup;
  fileValidationResponse;
  apiFileParsed;
  isApiFileValid = false;
  isValidated: boolean = false;

  constructor(
    public newApp: NewAppService,
    private appManager: AppManagerService,
    private apiVerSvc: ApiVersionsService,
    public router: Router,
    public route: ActivatedRoute,
    private el: ElementRef,
    public notifs: CustomNotificationsService,
    private kathraStatus: KathraElementStatusService
  ) { }

  goNext() {
    if( this.isApiVersionReady()){
      this.newApp.creationStep = 3;
      this.router.navigate(['..', 'implementation'], {relativeTo: this.route});
    }
  }

  delegateEvent($event){
    let fileInput: HTMLElement = <HTMLElement>(<HTMLElement>$event.target).closest('.fileselect').querySelector('input[type="file"]');
    fileInput.click();
  }

  processFile($event) {
    let apiFile = <Blob>$event.target.files[0];
    this.newApp.apiFile = apiFile;

    let fileSelectorNameDisplay: HTMLElement = <HTMLElement>(<HTMLElement>$event.target).closest('.fileselect').querySelector('button .filename.display');

    this.validateYAMLApiFile(apiFile);
  }

  validateYAMLApiFile(file) {
    var reader = new FileReader();
    reader.onload = (e) => {
      var apiFileContent = reader.result;
      try{
        this.isApiFileValid = true;
        this.apiFileParsed = YAML.safeLoad(apiFileContent);
        this.extractApiFileInfos(this.apiFileParsed);
      }catch(e){
        this.isApiFileValid = false;
        this.notifs.error("Exception", "Invalid specification file " + e);
      }

      this.resetValidationFeedback();
    }
    reader.readAsText(file);
  }

  extractApiFileInfos(apiFileParsed) {
    if(this.apiFileParsed.definitions){
      this.apiFileParsed.models = Object.keys(this.apiFileParsed.definitions).length;
    }else{
      this.apiFileParsed.models = 0;
    }

    if(this.apiFileParsed.paths){
      this.apiFileParsed.operations = Object.keys(this.apiFileParsed.paths).length;
    }else{
      this.apiFileParsed.operations = 0;
    }

    if(this.apiFileParsed.info['x-groupId']){
      this.apiFileParsed.groupId = this.apiFileParsed.info['x-groupId'];
    }else{
      this.isApiFileValid = false;
    }

    if(this.apiFileParsed.operations == 0 && this.apiFileParsed.models == 0){
      this.isApiFileValid = false;
    }
  }


  updateApiVersionStatusInterval(idApiVersion){
    let subscription = timer(0, 5000).subscribe( x => {
      this.refreshApiVersionStatus(idApiVersion)
      if( this.kathraStatus.isDone(this.newApp.api) ){
        if(this.isApiVersionReady()){
          this.notifs.success("Api version created",  "Api version " + idApiVersion + " has been created successfully");
        }else if(this.kathraStatus.isError(this.newApp.api)){
          this.notifs.error("Exception",  "An error happened while creating the Api Version " + idApiVersion );
        }
        subscription.unsubscribe();
      }
    });
  }

  refreshApiVersionStatus(idApiVersion) {
    this.apiVerSvc.getApiVersionById(idApiVersion).subscribe(
      (api) => { this.newApp.api.status = api.status; },
      (err) => { this.newApp.api.status = 'ERROR'; });
  }

  isApiVersionReady(){
    return this.kathraStatus.isReady(this.newApp.api);
  }

  doValidationFeedback(){
    let validateButton:HTMLElement = this.el.nativeElement.querySelector('.controls .button.validate');
    let otherButtons:NodeListOf<HTMLElement> = this.el.nativeElement.querySelectorAll('.controls .button:not(.validate)');
    let validateButtonIcon:HTMLElement  = validateButton.querySelector('i.icon');
    let validateButtonText:HTMLElement = validateButton.querySelector('.text');
    
    validateButton.classList.add("validated");
    validateButtonIcon.classList.add("check");
    validateButtonText.innerHTML = "VALIDATED";

    Array.from(otherButtons).forEach(item => item.classList.remove('hidden'));
  }

  resetValidationFeedback(){
    let validateButton:HTMLElement = this.el.nativeElement.querySelector('.controls .button.validate');
    let otherButtons:NodeListOf<HTMLElement> = this.el.nativeElement.querySelectorAll('.controls .button:not(.validate)');
    let validateButtonIcon:HTMLElement  = validateButton.querySelector('i.icon');
    let validateButtonText:HTMLElement = validateButton.querySelector('.text');
    
    validateButton.classList.remove("validated");
    validateButtonIcon.classList.remove("check");

    Array.from(otherButtons).forEach(item => item.classList.add('hidden'));
  }

  ngOnInit() {
  }
}
