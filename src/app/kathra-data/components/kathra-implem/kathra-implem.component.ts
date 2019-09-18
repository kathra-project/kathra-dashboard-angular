import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { K8sEnvironment } from '../../models/k8s-environment';
import { K8sWsService } from '../../services/k8s-ws.service';
import { ColorPickerService } from '../../../kathra-tools';
import { Implementation } from '../../../appmanager';
import { Component as KathraComponent  } from '../../../appmanager';
@Component({
  selector: 'kathra-implem',
  templateUrl: './kathra-implem.component.pug',
  styleUrls: ['./kathra-implem.component.scss']
})
export class KathraImplemComponent implements OnInit {

  @Input() implem: Implementation;
  @Input() comp: KathraComponent;
  @Output() headerClick: EventEmitter<string> = new EventEmitter();
  color;
  tagColor;

  constructor(
    private colorPick: ColorPickerService
  ) { }

  onHeaderClick(){
    this.headerClick.emit('implemId');
  }

  get nonEmptyTags(){
    if(this.implem["tags"] == null){
      return [this.implem["language"]]
    }else{
      return this.implem["tags"].filter(item => item != "");
    }
  }

  ngOnInit() {
    this.tagColor = this.colorPick.hslFromString(this.implem.name ? this.implem.name : "", "light");
    this.color = this.colorPick.colorFromStatus(this.implem.status);
  }
}
