import { Component, Input, OnInit } from '@angular/core';
import { SidebarsService } from '../../../kathra-sidebars';

@Component({
  selector: 'kathra-datasources',
  templateUrl: './datasources.component.pug',
  styleUrls: ['./datasources.component.scss']
})
export class DatasourcesComponent implements OnInit {

  @Input() data: {};

  constructor(
    private sbService: SidebarsService
  ) { }

  ngOnInit() {
    this.sbService.closeAll();
  }

}
