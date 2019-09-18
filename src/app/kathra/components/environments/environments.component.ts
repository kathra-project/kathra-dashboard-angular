import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { SidebarsService } from '../../../kathra-sidebars';
import { K8sWsService, K8sEnvironment } from '../../../kathra-data';
import { KathraEnvComponent } from '../../../kathra-data';
import { ModalComponent, ModalsService } from '../../../kathra-modals';

@Component({
  selector: 'kathra-environments',
  templateUrl: './environments.component.pug',
  styleUrls: ['./environments.component.scss'],
  providers: [ModalsService]
})
export class EnvironmentsComponent implements OnInit {

  constructor(
    private sbService: SidebarsService
  ) {}

  ngOnInit() {
    this.sbService.closeAll();
  }
}
