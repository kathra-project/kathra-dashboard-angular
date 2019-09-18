import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { K8sEnvironment } from '../../models/k8s-environment';
import { K8sWsService } from '../../services/k8s-ws.service';
import { ColorPickerService } from '../../../kathra-tools';

@Component({
  selector: 'kathra-env',
  templateUrl: './kathra-env.component.pug',
  styleUrls: ['./kathra-env.component.scss']
})
export class KathraEnvComponent implements OnInit {

  @Input() envId: string;
  @Output() headerClick: EventEmitter<string> = new EventEmitter();
  env: K8sEnvironment;
  color;

  constructor(
    private K8sModel: K8sWsService,
    private colorPick: ColorPickerService
  ) { }

  onHeaderClick(){
    this.headerClick.emit('envId');
  }

  get nonEmptyTags(){
     return this.env.tags.filter(item => item != "");
  }

  ngOnInit() {
    this.env = this.K8sModel.k8sEnvironments[this.envId];
    this.color = this.colorPick.hslFromString(this.env.name, "light");
  }
}
