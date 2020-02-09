import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class CustomNotificationsService {

  rawNotifs: Array<any>;
  lengthMessage: number;
  constructor(
    private notifs: NotificationsService
  ) { 
    this.rawNotifs = [];
    this.lengthMessage = 150;
  }

  error(_header: string, _body: string){
    let trimedBody = (_body.length > this.lengthMessage) ? _body.substring(0, this.lengthMessage) + "..." : _body;
    let notif = this.notifs.html(`<div class="header">${_header}</div><div class="body">${trimedBody}</div>`, null, null, "error");

    this.rawNotifs.push({id: notif.id, kind: 'error', title: _header, content: _body});
  }

  success(_header: string, _body: string){
    let trimedBody = (_body.length > this.lengthMessage) ? _body.substring(0, this.lengthMessage) + "..." : _body;
    let notif = this.notifs.html(`<div class="header">${_header}</div><div class="body">${trimedBody}</div>`, null, null, "success")
    
    notif.timeoutEnd.subscribe(($event)=> {
      this.rawNotifs.push({id: notif.id, kind: 'success', title: _header, content: _body});
    })
  }

  info(_header: string, _body: string){
    let trimedBody = (_body.length > this.lengthMessage) ? _body.substring(0, this.lengthMessage) + "..." : _body;
    let notif = this.notifs.html(`<div class="header">${_header}</div><div class="body">${trimedBody}</div>`, null, null, "success")
    
    notif.timeoutEnd.subscribe(($event)=> {
      this.rawNotifs.push({id: notif.id, kind: 'info', title: _header, content: _body});
    })
  }
}
