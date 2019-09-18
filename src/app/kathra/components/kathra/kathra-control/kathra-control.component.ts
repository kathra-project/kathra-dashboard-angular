import { Component, OnInit, Input, Output, ElementRef } from '@angular/core';
import { KathraComponent } from '../../kathra/kathra.component';
import { SidebarsService } from '../../../../kathra-sidebars';
import { CatalogueExplorerComponent } from '../../../';

@Component({
  selector: 'kathra-control',
  templateUrl: './kathra-control.component.pug',
  styleUrls: ['./kathra-control.component.scss']
})
export class KathraControlComponent implements OnInit {

  @Input() 
    label: string;

  mySidebarRef: string;

  constructor(
    private parent: KathraComponent,
    private elRef: ElementRef,
    private sb: SidebarsService
  ) { }

  stopClick($event){
    $event.stopPropagation();
  }

  handleRightClick($event){
    $event.stopPropagation();
    $event.preventDefault();
    
    if(!(<HTMLElement>this.elRef.nativeElement).classList.contains('selected')){
      if(this.sb.isOpened(this.mySidebarRef)){
        this.sb.close(this.mySidebarRef);
      }
      else{
        this.sb.open(this.mySidebarRef);
      }
    }
  }

  ngOnInit() {
    this.mySidebarRef = `sb_${this.label}-explorer`;
  }
}
