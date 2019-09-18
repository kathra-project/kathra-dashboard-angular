import { Component, ElementRef, Input, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { SidebarsService } from '../../services/sidebars.service';

@Component({
  selector: 'kathra-sidebar',
  templateUrl: './sidebar.component.pug',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  @Input() 
    id: string;
  @Output() 
    beingClosed: EventEmitter<string> = new EventEmitter();

  isOpened: boolean;
  element: HTMLElement;
  
  constructor(private sidebars: SidebarsService, private el: ElementRef) {
    this.element = el.nativeElement;
    this.isOpened = false;
  }
  
  ngOnInit(): void {
    let sidebar = this;
    
    // ensure id attribute exists
    if (!this.id) {
      console.error('sidebar must have an id');
      return;
    }
    
    // close sidebar on background click
    this.element.addEventListener('click', function(e: any){
      let target = e.target;

      // if sidebar-background is found, we clicked outside of the sidebar
      let sidebarBackground = target.closest('.kathraSidebarBackground');

      // close sidebar if we clicked on the background
      if(sidebarBackground){
        sidebar.close();
      } 
    });
    
    // add self (this sidebar instance) to the sidebar service so it's accessible from controllers
    this.sidebars.add(this);
  }
  
  // remove self from sidebar service when directive is destroyed
  ngOnDestroy(): void {
    this.sidebars.remove(this.id);
    this.element.remove();
  }
  
  // open sidebar
  open(): void {
    // display element
    const background: HTMLElement = this.element.closest('.kathraSidebarHost').querySelector('.kathraSidebarBackground');
    this.element.style.display = "flex";
    background.style.display = "block";
    this.isOpened = true;
  }
  
  // close sidebar
  close(): void {
    // hide element
    const background: HTMLElement = this.element.closest('.kathraSidebarHost').querySelector('.kathraSidebarBackground');
    this.element.style.display = "none";
    background.style.display = "none";
    this.isOpened = false;
  }
}
