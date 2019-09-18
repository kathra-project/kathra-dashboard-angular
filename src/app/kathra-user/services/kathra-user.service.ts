import { Injectable } from '@angular/core';

@Injectable()
export class KathraUserService {

  accessToken: any;
  ldapProfile: any;
  info: any;
  projectGroups: Array<string>;
  gitlabGroups: Array<any>;
  
  constructor() { }

  setToken(token){
    this.accessToken = token
  }

  setProfile(profile){
    this.ldapProfile = profile
  }

  setInfo(info){
    this.info = info;
    this.projectGroups = this.info.groups
      .filter(item => item.startsWith("Projet ") || item == "Direction Technique" || item == "Direction Scientifique")
      .map(item => {return {name: item.replace("Projet ", ""), id: item}});
  }
}
