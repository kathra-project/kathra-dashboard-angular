import { Component, OnInit } from '@angular/core';
import { FormAppApiComponent } from '../form-app-api/form-app-api.component'
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'kathra-update-app-api',
  templateUrl: '../form-app-api/form-app-api.component.pug',
  styleUrls: ['../form-app-api/form-app-api.component.scss']
})

export class UpdateAppApiComponent extends FormAppApiComponent {

  ngOnInit() {
    this.newApp.creationStep = 3;
    this.apiForm = new FormGroup({
      apiFile: new FormControl('',  Validators.required)
    })

    if(this.newApp.component == null || this.newApp.api == null ){
      this.router.navigate(["/", "kathra", "applications"]);
    }
  }

  validate(){
    if( this.isApiFileValid ) {
      this.isValidated = true;

      this.newApp.api.status = 'UPDATING'

      this.newApp.updateApi(this.newApp.api.id, this.newApp.apiFile).subscribe(
        (res) => {
          this.newApp.api.version = res['version'];
          this.updateApiVersionStatusInterval(res['id'])
          this.doValidationFeedback();
        },
        (err) => {
          this.notifs.error("Exception", err);
          this.isValidated = false;
          this.newApp.api.status = 'ERROR';
        });

    } else {
      this.resetValidationFeedback()
    }
  }

}
