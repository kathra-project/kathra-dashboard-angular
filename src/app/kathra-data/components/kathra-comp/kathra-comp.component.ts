import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ColorPickerService } from '../../../kathra-tools';
import { Router } from '@angular/router';
import { NewAppService } from '../../../kathra/services/new-app.service';
import { Component as KathraComponent } from '../../../appmanager';
@Component({
  selector: 'kathra-comp',
  templateUrl: './kathra-comp.component.pug',
  styleUrls: ['./kathra-comp.component.scss']
})
export class KathraCompComponent implements OnInit {

  @Input() comp: KathraComponent;
  @Output() headerClick: EventEmitter<string> = new EventEmitter();
  color;

  constructor(
    private colorPick: ColorPickerService,
    private router: Router,
    private newApp: NewAppService
  ) { }

  onHeaderClick(){
    this.headerClick.emit('compId');
  }

  get nonEmptyTags(){
     return [];
  }

  createNewApi(component: KathraComponent) {
    this.newApp.reset();
    this.newApp.creationStep = 2;
    this.newApp.component = component;
    this.router.navigate(["/", "kathra", "applications", "new", "api"]);
  }

  ngOnInit() {
    // this.color = this.colorPick.hslFromString(this.comp.name ? this.comp.name : "", "light");
    this.color = this.colorPick.colorFromStatus(this.comp.status);
  }
}
