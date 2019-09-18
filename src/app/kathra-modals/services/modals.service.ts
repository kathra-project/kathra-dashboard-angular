import { Injectable } from '@angular/core';

@Injectable()
export class ModalsService {
  private modals: any[] = [];
  
  add(modal: any) {
    this.modals.push(modal);
  }
  
  remove(id: string) {
    let modalToRemove = this.modals.findIndex(item => item.id == id);
    if(modalToRemove) this.modals.splice(modalToRemove, 1);
  }
  
  open(id: string) {
    let modalToOpen = this.modals.find(item => item.id == id);
    if(modalToOpen) modalToOpen.open();
  }
  
  close(id: string) {
    // close modal specified by id
    let modalToClose = this.modals.find(item => item.id == id);
    if(modalToClose) modalToClose.close();
  }
}