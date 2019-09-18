import { Component, OnInit, ElementRef } from '@angular/core';
import { NewAppService } from '../../../../services/new-app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KathraUserService } from '../../../../../kathra-user';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomNotificationsService } from '../../../../../kathra-tools/services/custom-notifications.service';
import { ComponentsService, Component as KathraComponent } from '../../../../../appmanager';
import { Observable, timer, pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { KathraElementStatusService } from '../../../../../kathra-tools';

@Component({
  selector: 'kathra-new-app-comp',
  templateUrl: './new-app-comp.component.pug',
  styleUrls: ['./new-app-comp.component.scss']
})

export class NewAppCompComponent implements OnInit {

  componentForm: FormGroup;
  isValidated: boolean = false;

  constructor(
    private newApp: NewAppService,
    private compSvc: ComponentsService,
    private user: KathraUserService,
    private router: Router,
    private route: ActivatedRoute,
    private el: ElementRef,
    private notifs: CustomNotificationsService,
    private kathraStatus: KathraElementStatusService
  ) { }

  goNext() {
    if(this.isValidated){
      this.newApp.creationStep = 2;
      this.router.navigate(['..', 'api'], {relativeTo: this.route});
    }
    else return;
  }

  validate(){
    if(!this.isValidated){
      if(this.componentForm.valid) {

        this.newApp.component = {
          name: this.componentForm.controls.name.value,
          description: this.componentForm.controls.desc.value,
          metadata: {
            groupPath: this.componentForm.controls.team.value
          },
          status: 'PENDING'
        }

        this.isValidated = true;

        this.newApp.createComponent(this.newApp.component).subscribe(
          (res) => {
            this.newApp.component.id = res['id'];
            this.updateComponentStatusInterval(this.newApp.component.id)
            this.doValidationFeedback();
            this.isValidated = true;
          },
          (err) => {
            this.newApp.component.status = 'ERROR';
            this.isValidated = false;
            this.notifs.error("Exception", err);
          });
      }
    }
  }

  updateComponentStatusInterval(idComponent){
    let subscription = timer(0, 3000).subscribe( x => {
      this.refreshComponentStatus(idComponent)
      if( this.kathraStatus.isDone(this.newApp.component) ){
        if(this.isComponentReady()){
          this.notifs.success("Component created",  "Component " + idComponent + " has been created successfully");
        }else if(this.kathraStatus.isError(this.newApp.component)){
          this.notifs.error("Exception",  "An error happened while creating the component " + idComponent );
        }
        subscription.unsubscribe();
      }
    });
  }

  refreshComponentStatus(idComponent) {
    this.compSvc.getComponentById(idComponent).subscribe(
      (component) => { this.newApp.component.status = component.status; },
      (err) => { this.kathraStatus.isError(this.newApp.component) });
  }

  isComponentReady(){
    return this.kathraStatus.isReady(this.newApp.component);
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
    this.newApp.reset();

    this.componentForm = new FormGroup({
      name: new FormControl('',  Validators.required),
      team: new FormControl(''),
      desc: new FormControl('', Validators.required),
    })
  }
}
