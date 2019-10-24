import { Component, OnInit } from '@angular/core';
import { Inject, Injectable, Optional } from '@angular/core';
import { GroupsService } from './appmanager';
import { LoggerService } from './kathra-tools';
import { Observable, timer } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { KathraUserService } from './kathra-user';
import { KATHRA_VERSION } from './app.config';

@Component({
  selector: 'kathra-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  kathraVersion: any;
  applicationReady: boolean = false;
  applicationError: boolean = false;
  keycloakReady: boolean = false;
  loadingText = "";
  loadingCatchPhrases = [
    "Spinning up the hamster...",
    "Shovelling coal into the server...",
    "Programming the flux capacitor...",
    "Breeding the bits...",
    "Following the white rabbit...",
    "Searching for an answer to Life, the Universe, and Everything...",
    "Testing for perfection...",
    "Deterministically simulating the future...",
    "Generating next funny line...",
    "Solving P vs. NP...",
    "Creating time-loop inversion field...",
    "↑ ↑ ↓ ↓ ← → ← → B A...",
    "Drawing power from the sun...",
    "Waiting for magic to happen...",
    "Computing 6 x 9...",
    "Downloading the whole Internet...",
    "Charging the microverse battery..."
  ];

  notifsOptions: any = {
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    animate: 'fromBottom',
    icons: {
      alert: "\n    <svg class=\"simple-notification-svg alert\"   xmlns=\"http://www.w3.org/2000/svg\" fill=\"#ffffff\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\">\n            <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n            <path d=\"M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z\"/>\n        </svg>\n    ",
      error: "\n    <svg class=\"simple-notification-svg error\"   xmlns=\"http://www.w3.org/2000/svg\" fill=\"#ffffff\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\">\n            <path d=\"M0 0h24v24H0V0z\" fill=\"none\"/>\n            <path d=\"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z\"/>\n        </svg>\n    ",
      info: "\n     <svg class=\"simple-notification-svg info\"    xmlns=\"http://www.w3.org/2000/svg\" fill=\"#ffffff\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\">\n            <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n            <path d=\"M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z\"/>\n        </svg>\n    ",
      success: "\n  <svg class=\"simple-notification-svg success\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"#ffffff\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\">\n            <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n            <path d=\"M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z\"/>\n        </svg>\n    ",
      warn: "\n     <svg class=\"simple-notification-svg warn\"    xmlns=\"http://www.w3.org/2000/svg\" fill=\"#ffffff\" width=\"64\" viewBox=\"0 0 64 64\" height=\"64\">\n          <circle cx=\"32.086\" cy=\"50.142\" r=\"2.256\"/>\n          <path d=\"M30.08 25.012V42.32c0 1.107.897 2.005 2.006 2.005s2.006-.897 2.006-2.005V25.012c0-1.107-.897-2.006-2.006-2.006s-2.006.898-2.006 2.006z\"/>\n          <path d=\"M63.766 59.234L33.856 3.082c-.697-1.308-2.844-1.308-3.54 0L.407 59.234c-.331.622-.312 1.372.051 1.975.362.605 1.015.975 1.72.975h59.816c.705 0 1.357-.369 1.721-.975.361-.603.381-1.353.051-1.975zM5.519 58.172L32.086 8.291l26.568 49.881H5.519z\"/>\n        </svg>\n    "
    }
  };

  constructor(
    private logger: LoggerService,
    private groupMgr: GroupsService,
    private keycloak: KeycloakService,
    private user: KathraUserService,
    @Optional()@Inject(KATHRA_VERSION) kathraVersion: any
  ){
    this.logger.setLevel(this.logger.LEVEL.DEBUG);
    if(kathraVersion) this.kathraVersion = kathraVersion;
  }

  initApp(){
    this.applicationReady = true;
    this.groupMgr.getGroups("body")
    .catch(function(error: Response | any){
      let errMsg: string;
      if (error instanceof Response) {
        errMsg = JSON.stringify(error);
      }
      else {
        errMsg = "Internal server error";
      }
      this.applicationError = true;
      this.applicationReady = true;
      return Observable.throw(errMsg);
    }.bind(this))
    .subscribe(function(groups) {
      this.user.gitlabGroups = groups.sort((a,b)=>{
        if(a.path.toLowerCase() < b.path.toLowerCase()) return -1;
        if(b.path.toLowerCase() < a.path.toLowerCase()) return 1;
        return 0;
      });

      const kcInstance = this.keycloak.getKeycloakInstance();
      this.user.setToken(kcInstance.token);
      this.user.setInfo(kcInstance.idTokenParsed);
      this.applicationReady = true;
      
    }.bind(this));
  }

  randomLoadingText(){

    if(!this.applicationReady){
      this.loadingText = this.loadingCatchPhrases[Math.floor(Math.random()*this.loadingCatchPhrases.length)]
      setTimeout(this.randomLoadingText.bind(this), Math.floor(Math.random()*1000 + 2000));
    }
  }

  ngOnInit(){
    
    this.randomLoadingText();

    this.keycloak.isLoggedIn().then((isLoggedIn: boolean) => {
      if(isLoggedIn){
        this.keycloakReady = true;
        this.initApp();
      }
    });

    //this.keycloakReady = true;
    //this.applicationReady = true;
  }
}
