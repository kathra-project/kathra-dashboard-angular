import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { K8sApplication } from '../../models/k8s-application';
import { K8sWsService } from '../../services/k8s-ws.service';
import { ColorPickerService } from '../../../kathra-tools';
//import { AsArrayPipe } from '../../../kathra-tools';

@Component({
  selector: 'kathra-app-conf',
  templateUrl: './kathra-app-conf.component.pug',
  styleUrls: ['./kathra-app-conf.component.scss']
})
export class KathraAppConfComponent implements OnInit {

  @Input()
    appId: string;
  @Output()
    processConfiguredApp: EventEmitter<K8sApplication> = new EventEmitter();
  app: K8sApplication;
  color = {
    light: null,
    normal: null,
    dark: null
  }
  
  requiredParamsForm: FormGroup;
  optionalParamsForm: FormGroup;

  kathraValidation = {
    empty : function(value, errorName, errorMessage, paramName){
      return function(input: FormControl){
        return (input.value && input.value != "") ? null : {[errorName]: {"message": errorMessage.replace('{{value}}', value).replace('{{field}}', paramName)}};
      }
    },

    minLength : function(value, errorName, errorMessage, paramName){
      return function(input: FormControl){
        return (input.value && input.value.length >= value) ? null : {[errorName]: {"message": errorMessage.replace('{{value}}', value).replace('{{field}}', paramName)}};
      }
    },
    
    maxLength : function(value, errorName, errorMessage, paramName){
      return function(input: FormControl){
        return (input.value && input.value.length <= value) ? null : {[errorName]: {"message": errorMessage.replace('{{value}}', value).replace('{{field}}', paramName)}};
      }
    },

    rangedLength : function(value, errorName, errorMessage, paramName){
      return function(input: FormControl){
        let val = {min: value.split('-')[0], max: value.split('-')[1]};
        return (input.value && input.value.length <= value.max && input.value.length >= value.min) ? null : {[errorName]: {"message": errorMessage.replace('{{value.min}}', val.min).replace('{{value.max}}', val.max).replace('{{field}}', paramName)}};
      }
    },

    minValue : function(value, errorName, errorMessage, paramName){
      return function(input: FormControl){
        return (input.value && <number>(input.value) >= value) ? null : {[errorName]: {"message": errorMessage.replace('{{value}}', value).replace('{{field}}', paramName)}};
      }
    },

    maxValue : function(value, errorName, errorMessage, paramName){
      return function(input: FormControl){
        return (input.value && <number>(input.value) <= value) ? null : {[errorName]: {"message": errorMessage.replace('{{value}}', value).replace('{{field}}', paramName)}};
      }
    },

    rangedValue : function(value, errorName, errorMessage, paramName){
      return function(input: FormControl){
        let val = {min: value.split('-')[0], max: value.split('-')[1]};
        return (input.value && <number>(input.value) <= value.max && <number>(input.value) >= value.min) ? null : {[errorName]: {"message": errorMessage.replace('{{value.min}}', val.min).replace('{{value.max}}', val.max).replace('{{field}}', paramName)}};
      }
    },

    alphaNum : function(value, errorName, errorMessage, paramName){
      return function(input: FormControl){
        let alphaNumRe = /[a-zA-Z0-9]+/;
        return (input.value && (alphaNumRe.test(input.value) || input.value === "")) ? null : {[errorName]: {"message": errorMessage.replace('{{value}}', value).replace('{{field}}', paramName)}};
      }
    }

  }

  constructor(
    private elRef: ElementRef,
    private K8sModel: K8sWsService,
    private colorPick: ColorPickerService
  ) { }

  getAppColor(team: string, level?: string): string{
    if(team == "opensource"){
      return `hsl(0, 0%, ${ 'normal' == level ? 40 : 50}%)`
    }

    let hslColor = this.colorPick.hslFromString(team, level);
    return hslColor;
  }

  initForms(){
    let requiredParamsControls = {};

    for(let param of this.app.parameters){
      let validators = this.getValidators(param);
      requiredParamsControls[this.app.name + '@' + param.name] = new FormControl(param.defaultValue, Validators.compose(validators))
    }

    this.requiredParamsForm = new FormGroup(requiredParamsControls);
  }

  getValidators(_param): Array<ValidatorFn>{
    let validators = [];

    for(let rule of _param.rules){
      if(this.kathraValidation[rule.type])
        validators.push(this.kathraValidation[rule.type](rule.value, rule.type, rule.prompt, _param.name));
    }

    return validators;
  }

  getParamType(type){
    let _type;
    switch(type){
      case "text":
      case "secret":
      case "select":
        _type = "string"
        break;

      case "float":
        _type = "float"
        break;

      case "integer":
        _type = "integer"
        break;

      case "boolean":
        _type = "boolean"
        break;

      default:
        _type = "string";
        break;
    }

    return _type;
  }

  submit(){
    let tempParams = [];

    if(this.requiredParamsForm.valid){
      for(let param in this.requiredParamsForm.controls){
        let currentParam = Object.assign({}, this.app.parameters.filter(item => item.name == param.split('@')[1])[0])

        currentParam.value = this.requiredParamsForm.controls[param].value;
        console.log("before change", this.app.parameters)
        currentParam.type = this.getParamType(currentParam.type);
        console.log("after change", this.app.parameters)
        tempParams.push(currentParam);
      }
      
      let tempApp = Object.assign({}, this.app, {parameters: tempParams});
      this.processConfiguredApp.emit(tempApp);
    }
  }

  ngOnInit() {
    this.app = this.K8sModel.k8sApplications.filter(item => item.id == this.appId)[0];
    //this.app = this.dummyApp;
    
    this.color.normal = this.getAppColor(this.app.licence, 'normal');
    this.color.light = this.getAppColor(this.app.licence, 'light');

    this.initForms();
  }
}
