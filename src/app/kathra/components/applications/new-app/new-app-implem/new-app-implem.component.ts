import { Component, OnInit, ElementRef } from '@angular/core';
import { NewAppService } from '../../../../services/new-app.service';
import { KathraUserService } from '../../../../../kathra-user';
import { ImplementationsService, ImplementationParameters } from '../../../../../appmanager';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, timer, pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { KathraElementStatusService } from '../../../../../kathra-tools';
import { CustomNotificationsService } from '../../../../../kathra-tools/services/custom-notifications.service';

@Component({
  selector: 'kathra-new-app-implem',
  templateUrl: './new-app-implem.component.pug',
  styleUrls: ['./new-app-implem.component.scss']
})
export class NewAppImplemComponent implements OnInit {

  implemForm: FormGroup;
  isValidated: boolean = false;
  subscription;
  
  constructor(
    private newApp: NewAppService,
    private user: KathraUserService,
    private el: ElementRef,
    private router: Router,
    private implemSvc: ImplementationsService,
    private notifs: CustomNotificationsService,
    private kathraStatus: KathraElementStatusService
  ) { }

  validate(){
    if(!this.isValidated){
      if(this.implemForm.valid) {
        this.newApp.implem = {
          status: 'PENDING'
        //   name: this.implemForm.controls.implemName.value,
        //   description: this.implemForm.controls.desc.value,
        //   language: this.implemForm.controls.desc.value
        }
        
        let parameters: ImplementationParameters = {
          name: this.implemForm.controls.name.value,
          apiVersion: this.newApp.api,
          language: this.implemForm.controls.language.value,
          desc: this.implemForm.controls.desc.value
          // metadata: {
          //   groupPath: this.implemForm.controls.team.value
          // }
        };

        this.implemSvc.createImplementation(parameters).subscribe(resultImplem => {
          this.newApp.implem.id = resultImplem['id'];
          this.updateImplemStatusInterval(this.newApp.implem.id)
          this.doValidationFeedback();
          this.isValidated = true;
        },
        (err) => {
          this.newApp.implem.status = 'ERROR';
          this.isValidated = false;
          this.notifs.error("Exception", err);
        })
      }
    }
  }

  updateImplemStatusInterval(idImplem){
    this.subscription = timer(0, 3000).subscribe( x => {
      this.refreshImplemStatus(idImplem)
      if( this.kathraStatus.isDone(this.newApp.implem) ){
        if(this.isImplemReady()){
          this.notifs.success("Implementation created",  "Implementation " + idImplem + " has been created successfully");
        } else if(this.kathraStatus.isError(this.newApp.implem)){
          this.notifs.error("Exception",  "An error happened while creating the implementation " + idImplem );
        }
        this.subscription.unsubscribe();
      }
    });
  }

  refreshImplemStatus(idImplem) {
    this.implemSvc.getImplementationById(idImplem).subscribe(
      (implem) => { this.newApp.implem.status = implem.status; },
      (err) => { this.kathraStatus.isError(this.newApp.implem) });
  }

  isImplemReady(){
    return this.kathraStatus.isReady(this.newApp.implem);
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

  ngOnInit() {
    this.newApp.creationStep = 3;
    this.implemForm = new FormGroup({
      name: new FormControl('', Validators.required),
      team: new FormControl(''),
      language: new FormControl(''),
      desc: new FormControl('', Validators.required),
    })

    if(this.newApp.api == null){
      this.router.navigate(["/", "kathra", "applications"]);
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
