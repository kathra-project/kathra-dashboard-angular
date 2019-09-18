import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { K8sApplication } from '../../models/k8s-application';
import { K8sWsService } from '../../services/k8s-ws.service';
import { ColorPickerService } from '../../../kathra-tools';

export enum DisplayEnum {
  Normal = 'normal',
  Compact = 'compact',
  Wide = 'wide'
}

@Component({
  selector: 'kathra-app',
  templateUrl: './kathra-app.component.pug',
  styleUrls: ['./kathra-app.component.scss']
})
export class KathraAppComponent implements OnInit {

  @Input()
    appId: string;
  @Input()
    display: string = DisplayEnum.Normal;

  app: K8sApplication;
  color = {
    light: null,
    normal: null,
    dark: null
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

  ngOnInit() {
    this.app = this.K8sModel.k8sApplications.filter(item => item.id == this.appId)[0];
    this.color.normal = this.getAppColor(this.app.licence, 'normal');
    this.color.light = this.getAppColor(this.app.licence, 'light');

    (<HTMLElement>this.elRef.nativeElement).classList.add(this.display);
  }
}
