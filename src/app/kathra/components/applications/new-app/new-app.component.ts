import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { NewAppService } from '../../../services/new-app.service';

@Component({
  selector: 'kathra-new-app',
  templateUrl: './new-app.component.pug',
  styleUrls: ['./new-app.component.scss']
})
export class NewAppComponent implements OnInit {

  constructor(
    private newApp: NewAppService,
    private cdRef:ChangeDetectorRef
  ) { }
 

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }
}
