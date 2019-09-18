import { Component, OnInit } from '@angular/core';
import { ColorPickerService } from '../../../kathra-tools';
import { KathraUserService } from '../../../kathra-user';
import { CustomNotificationsService } from '../../../kathra-tools';

@Component({
  selector: 'kathra-navbar',
  templateUrl: './navbar.component.pug',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private user: KathraUserService,
    private colorPick: ColorPickerService,
    private notifs: CustomNotificationsService
  ) { }

  get nameAcronym(){
    if(this.user.info){
        if (this.user.info.family_name) {
            let clearedFamilyName = this.user.info.family_name.toUpperCase().replace("D'", '').replace("DE ", '');
            return (this.user.info.given_name[0] + clearedFamilyName[0]).toUpperCase();
        } else if (this.user.info.username) {
            return this.user.info.username.toUpperCase();
        } else {
            console.warn("unable to find user information", this.user.info);
            return "Unknown";
        }
    }
  }
  
  toggleNotifsList($event?){
    let notifsListEl = <HTMLElement>document.querySelector("kathra-navbar .navbar-content .menus .notifs-list");

    if(notifsListEl.style.display != "none"){
      notifsListEl.style.display = "none";
    }
    else {
      notifsListEl.style.display = "block";
    }
    if($event) $event.stopPropagation();
  }

  popRawNotif(_id: string) {
    this.notifs.rawNotifs.splice(this.notifs.rawNotifs.findIndex(item => item.id === _id), 1);
    if(this.notifs.rawNotifs.length == 0) {
      this.toggleNotifsList();
    }
  }

  ngOnInit() {
    let notifsListEl = <HTMLElement>document.querySelector("kathra-navbar .navbar-content .menus .notifs-list");

    window.addEventListener('click', function($event){
      if(notifsListEl.style.display != "none"){
        notifsListEl.style.display = "none";
      }
    });
      
    notifsListEl.addEventListener("click", function($event){
      event.stopPropagation();
    });
  }
}
