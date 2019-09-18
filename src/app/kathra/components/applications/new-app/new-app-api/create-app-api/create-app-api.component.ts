import { Component, OnInit } from '@angular/core';
import { FormAppApiComponent } from '../form-app-api/form-app-api.component'
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'kathra-create-app-api',
  templateUrl: '../form-app-api/form-app-api.component.pug',
  styleUrls: ['../form-app-api/form-app-api.component.scss']
})

export class CreateAppApiComponent extends FormAppApiComponent {

  ngOnInit() {
    this.apiForm = new FormGroup({
      apiFile: new FormControl('',  Validators.required)
    })

    if(this.newApp.component == null){
      this.router.navigate(["/", "kathra", "applications"]);
    }
  }

  validate(){
    if( this.isApiFileValid ) {
      this.isValidated = true;

      this.newApp.api = {
        status: 'PENDING'
      }

      this.newApp.createApi(this.newApp.component.id, this.newApp.apiFile).subscribe(
        (res) => {
          this.newApp.api.id = res['id'];
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
