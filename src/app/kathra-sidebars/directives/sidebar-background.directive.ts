import { Directive, Input, ElementRef, HostListener } from '@angular/core';
import { SidebarsService } from '../services/sidebars.service';

@Directive({
  selector: '[kathraSidebarBackground]',
})
export class SidebarBackgroundDirective {
  
  @Input()
    kathraSidebarBackground;

  constructor(
    private el: ElementRef,
    private sb: SidebarsService
  ){}

  @HostListener('click', ['$event']) onClick($event){
    for(let s of this.sb.sidebars){
      if(s.isOpened) {
        this.sb.close(s.id);
        $event.stopPropagation();
      }
      this.el.nativeElement.style.display = 'none';
    }
  };
 
}
