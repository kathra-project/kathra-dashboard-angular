import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { K8sApplication } from '../../models/k8s-application';
import { K8sWsService } from '../../services/k8s-ws.service';
import { ColorPickerService } from '../../../kathra-tools';
import { CatalogEntriesService, CatalogEntryPackage, CatalogEntry } from '../../../appmanager';

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
    catalogEntry: CatalogEntry;
  @Input()
    display: string = DisplayEnum.Normal;

  app: K8sApplication;
  color = {
    light: null,
    normal: null,
    dark: null
  }

  constructor(
    private catalogEntriesSvc: CatalogEntriesService,
    private elRef: ElementRef,
    private K8sModel: K8sWsService,
    private colorPick: ColorPickerService
  ) { 
  }

  getAppColor(team: string, level?: string): string{
    if(team == "opensource"){
      return `hsl(0, 0%, ${ 'normal' == level ? 40 : 50}%)`
    }

    let hslColor = this.colorPick.hslFromString(team, level);
    return hslColor;
  }

  ngOnInit() {
  }
}
