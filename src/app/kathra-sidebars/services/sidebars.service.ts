import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SidebarsService {
  private _sidebars: any[] = [];
  
  statusChange: BehaviorSubject<{sidebar: string, action: string}> = 
            new BehaviorSubject<{sidebar: string, action: string}>({sidebar: "", action: ""});
  
  get sidebars(){
    return this._sidebars;
  }

  isOpened(id: string) {
    const target = this._sidebars.find((item) => item.id == id);
    if(target) return target.isOpened;
    else return false;
  }

  add(sidebar: any) {
    this._sidebars.push(sidebar);
  }
  
  remove(id: string) {
    let sidebarToRemove = this._sidebars.findIndex(item => item.id == id);
    if(sidebarToRemove) this._sidebars.splice(sidebarToRemove, 1);
  }
  
  open(id: string) {
    let sidebarToOpen = this._sidebars.find(item => item.id == id);
    if(sidebarToOpen) sidebarToOpen.open();
    this.statusChange.next({
      sidebar: id,
      action: 'open'
    })
  }
  
  close(id: string) {
    // close sidebar specified by id
    let sidebarToClose = this._sidebars.find(item => item.id == id);
    if(sidebarToClose) sidebarToClose.close();
    this.statusChange.next({
      sidebar: id,
      action: 'close'
    })
  }

  closeAll(){
    for(let s of this._sidebars) {
      if(s.isOpened) this.close(s.id);
    }
  }

  toggle(id: string){
    if(this.isOpened(id)) this.close(id);
    else this.open(id);
  }
}