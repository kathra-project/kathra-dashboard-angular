import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalsService } from '../../services/modals.service';

@Component({
  //moduleId: module.id.toString(),
  selector: 'kathra-modal',
  templateUrl: './modal.component.pug',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  
  @Input() 
    id: string;
  
  element: HTMLElement;
  
  constructor(private modals: ModalsService, private el: ElementRef) {
    this.element = el.nativeElement;
  }
  
  ngOnInit(): void {
    let modal = this;
    
    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }
    
    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);
    
    // close modal on background click
    this.element.addEventListener('click', function(e: any){
      let target = e.target;

      // if modal-background is found, we clicked outside of the modal
      let modalBackground = target.closest('.modal-background');

      // close modal if we clicked on the background
      if(modalBackground){
        modal.close();
      } 
    });
    
    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modals.add(this);
  }
  
  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.modals.remove(this.id);
    this.element.remove();
  }
  
  // open modal
  open(): void {
    // display element
    this.element.style.display = "block";
    document.body.classList.add('modal-open');
  }
  
  // close modal
  close(): void {
    // hide element
    this.element.style.display = "none";
    document.body.classList.remove('modal-open');
  }
}
