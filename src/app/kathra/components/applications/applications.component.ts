import { Component, Input, OnInit } from '@angular/core';
import { SidebarsService } from '../../../kathra-sidebars';

@Component({
  selector: 'kathra-applications',
  templateUrl: './applications.component.pug',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  @Input() data: {};

  constructor(
    private sbService: SidebarsService
  ) {}

  ngOnInit() {
    this.sbService.closeAll();
  }
}
