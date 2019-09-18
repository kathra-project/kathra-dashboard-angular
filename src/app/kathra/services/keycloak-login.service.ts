import { Injectable } from '@angular/core';
import { Keycloak, KeycloakAuthorization } from '@ebondu/angular2-keycloak';
import { KathraUserService } from '../../kathra-user'

@Injectable()
export class KeycloakLoginService {

  public parsedToken: any;
  public authenticated: boolean;
  public profile: any;

  constructor(
    private keycloak: Keycloak,
    private keycloakAuth: KeycloakAuthorization,
    private user: KathraUserService) {
    
    this.keycloakAuth.init();
    this.keycloak.config = 'assets/keycloak.json';
    
    // Initialise the Keycloak
    this.keycloak.init({
      checkLoginIframe: false,
      adapter: "default",
      responseMode: "fragment"
    }) ;

    Keycloak.authenticatedObs.subscribe(auth => {
      this.authenticated = auth;
      if(this.authenticated){
        this.user.setToken(this.keycloak.tokenParsed);
        this.loadProfile();
        this.loadUserInfo();
      }
    });
  }

  loadUserInfo(){
    this.keycloak.loadUserInfo().subscribe(userInfo => {
      this.user.setInfo(userInfo);
    })
  }

  loadProfile() {
    this.keycloak.loadUserProfile().subscribe(profile => {
      this.user.setProfile(profile);
    });
  }

  login() {
    this.keycloak.login({});
  }

  logout() {
    this.keycloak.logout({});
  }

  getToken(){
    return this.keycloak.accessToken;
  }

  get isInitialized(){
    return Keycloak.initializedObs;
  }

  get isAuthenticated(){
    return Keycloak.authenticatedObs;
  }
}
