import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { KathraUserService } from '../../../../../kathra-user';
import { MultivalInputComponent } from '../../../../../kathra-tools';
import { Router, ActivatedRoute } from '@angular/router';
import { NewEnvService } from '../../../../services/new-env.service';

export function matchesRegex(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const result = nameRe.test(control.value);
    return result ? null : {'forbiddenChar': {value: control.value}};
  };
}

@Component({
  selector: 'kathra-new-env-infos',
  templateUrl: './new-env-infos.component.pug',
  styleUrls: ['./new-env-infos.component.scss']
})
export class NewEnvInfosComponent implements OnInit {

  basicInfoForm: FormGroup;

  constructor(
    private newEnv: NewEnvService,
    private router: Router,
    private route: ActivatedRoute,
    private user: KathraUserService
  ) { }

  updateTags(values){
    this.newEnv.env.tags = values;
  }

  validateInfos(){
    if(this.basicInfoForm.controls.envName.valid) {
      this.newEnv.env.name = this.basicInfoForm.controls.envName.value;
      this.newEnv.env.owner = this.basicInfoForm.controls.envTeam.value;

      this.router.navigate(['../', 'applications'], {relativeTo: this.route});
    }
  }

  ngOnInit() {
    this.newEnv.reset();
    
    this.basicInfoForm = new FormGroup({
      envName: new FormControl(null, matchesRegex(/^[a-z0-9]+([-][a-z0-9]+)*$/)),
      envTeam: new FormControl("")
    })
  }
}
