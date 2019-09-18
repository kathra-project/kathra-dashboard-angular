import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppConfig } from '../../app.config';

import { K8sApplication } from '../models/k8s-application';
import { K8sEnvironment } from '../models/k8s-environment';

import { WebSocketService } from './websocket.service';
import { LoggerService } from '../../kathra-tools/services/logger.service';

import { CustomNotificationsService } from '../../kathra-tools/services/custom-notifications.service';

@Injectable()
export class K8sWsService {
  
  public k8sApplications: Array<K8sApplication> = [];
  public k8sEnvironments: {[key: string]: K8sEnvironment} = {};
  
  private wsSubject: Subject<any>;
  
  constructor(
    private http: HttpClient,
    private logger: LoggerService,
    private ws: WebSocketService,
    private config: AppConfig,
    private notifs: CustomNotificationsService) {
    // Do stuff...
    
    this.initWebsocket();
  }
  
  /**
   * Gets the WS endpoint from a simple GET request to the backend and opens the connection.
   * On connection, sends a message to the server to initiate data exchanges
   */
  private initWebsocket() {
    const websocketEndpoint = this.config.getConfig("platform_manager_endpoint");
    
    this.wsSubject = <Subject<any>>this.ws.connect(websocketEndpoint)
    .pipe(map((response: MessageEvent): any => {
      let data = JSON.parse(response.data);
      return data;
    }));
    
    this.wsSubject.subscribe(this.getIncomingMessage.bind(this));
    
    setTimeout(function(){
      this.sendOutgoingMessage({ operation: 'connection', username: 'all' }, {});
    }.bind(this), 500);
    
    interval(60*1000).subscribe(function(){
      this.logger.debug("Sending keepalive to server....", [{ operation: 'keepAlive'}, {message: "toto"}]);
      this.sendOutgoingMessage({ operation: 'keepAlive'}, {message: "toto"});
    }.bind(this));
  }
  
  /**
   * Processes an incoming message, routing to its processing depending on the message header
   * @param message The message to process
   */
  getIncomingMessage(message): void {
    switch (message.headers.operation) {
      
      // LIST PLATFORMS
      case 'listPlatforms':
        this.logger.debug("ListPlatforms from WS server with : ", message.body);
        this.setPlatforms(message.body);
        this.logger.debug("Model platforms: ", this.k8sEnvironments);
        break;
      
      // LIST SERVICES
      case 'listServices':
        this.logger.debug("ListServices from WS server with : ", message.body);
        this.setServices(message.body);
        break;
      
      // CREATE/UPDATE PLATFORM
      case 'updatePlatform':
      case 'createPlatform':
        this.logger.debug("UpdatePlatform from WS server with : ", message.body);
        this.updatePlatform(message.body);
        break;

      // DELETE PLATFORM
      case 'deletePlatform':
        this.logger.debug("DeletePlatform from WS server with : ", message.body);
        this.onDeletePlatform(message.headers.platformName);
        this.message(message.body);
        break;
      
      // GET EVENTS
      case 'events':
        this.logger.debug("Received events from WS server with : ", message.body);
        if(this.k8sEnvironments[message.headers.platformName]) {
          this.setPlatformEvents(message.headers.platformName, message.body);
        }
        break;
      
      // NEW EVENT
      case 'newEvent':
        this.logger.debug("Received new event from WS server with : ", message.body);
        if(this.k8sEnvironments[message.headers.platformName]) {
          this.addPlatformEvent(message.headers.platformName, message.body);
        }
        break;
      
      // GENERIC OPERATION RESPONSE
      case 'message':
        this.logger.debug("Acknowledge message from WS server with : ", message.body);
        this.message(message.body);
        break;
    }
  }
  
  /**
   * Sends an outgoing message to the server
   * @param _headers The message headers
   * @param _data   The message body
   */
  sendOutgoingMessage(_headers, _data): void {
    // this.logger.debug("Sending message to WS server with : ", _headers, _data);
    this.wsSubject.next({
      headers: _headers,
      body: _data
    });
  }
  
  
  /* CLIENTS OPERATIONS */
  getPlatforms(): Array<K8sEnvironment> {
    let ret = [];
    for(let pk_key in this.k8sEnvironments) {
      ret.push(this.k8sEnvironments[pk_key]);
    }
    return ret;
  }
  
  getPlatformsByTags(_tags: Array<string>): Array<K8sEnvironment> {
    let platformsToReturn: Array<K8sEnvironment> = [];
    
    for(let pk_key in this.k8sEnvironments) {
      let current = this.k8sEnvironments[pk_key];
      let tags = current.tags;
      let allTagsThere = true;
      
      for(let j=0; j<_tags.length; j++){
        if(!tags.includes(_tags[j]))
        allTagsThere = false;
      }
      
      if(allTagsThere)
      platformsToReturn.push(current);
    }
    return platformsToReturn.length != 0 ? platformsToReturn : [];
  }
  
  getPlatform(_name: string): K8sEnvironment {
    return this.k8sEnvironments[_name];
  }
  
  getServices(): Array<K8sApplication> {
    return (this.k8sApplications && this.k8sApplications.length != 0) ? this.k8sApplications : [];
  }
  
  getServicesByType(_type: string): Array<K8sApplication> {
    // let filteredServices: Array<K8sApplication> = this.filterByProp.transform(this.k8sApplications, 'type', _type);
    // return (filteredServices.length != 0) ? filteredServices : null;
    return null;
  }
  
  getService(_handle: string): K8sApplication {
    for(let i=0; i<this.k8sApplications.length; i++){
      if(this.k8sApplications[i].id == _handle) 
      return this.k8sApplications[i];
    }
    return null;
  }
  
  createPlatform(_platform: K8sEnvironment): void {
    this.sendOutgoingMessage({operation: "createPlatform"}, _platform);
  }
  
  deletePlatform(_platformName: string): void {
    this.logger.debug("Sending deletePlatform to server with : ", _platformName);
    this.sendOutgoingMessage({operation: 'deletePlatform', username: 'all', platformName: _platformName}, {});
  }
  
  createService(_service: K8sApplication): void {
    
    this.sendOutgoingMessage({operation: "test"}, {
      resource: "service",
      payload: {
        test: "wuala",
        chuck: "testa"
      }
    });
  }
  
  
  /* SERVER OPERATIONS */
  setPlatforms(_platforms: Array<K8sEnvironment>): void {
    for(let i=0; i<_platforms.length; i++) {
      this.k8sEnvironments[_platforms[i].name] = _platforms[i];
    }
  }
  
  setPlatformEvents(platform, _events: Array<any>): void{
    this.k8sEnvironments[platform].events = _events;
  }
  addPlatformEvent(platform, _event: any): void {
    if(!this.k8sEnvironments[platform].events) 
      this.k8sEnvironments[platform].events = [];
    this.k8sEnvironments[platform].events.push(_event);
  }

  setServices(_services: Array<K8sApplication>): void {
    this.k8sApplications = _services;
  }
  
  updatePlatform(_platform: K8sEnvironment): void {

    if(this.k8sEnvironments[_platform.name]) {
      let wasFreshlyCreated = false;
      if(this.k8sEnvironments[_platform.name].status == "DEPLOYING" && _platform.status == "AVAILABLE") wasFreshlyCreated = true;
      if(wasFreshlyCreated) this.notifs.success("CREATION SUCCESSFUL", `Environement ${_platform.name} has been successfuly created!`);
      
      this.k8sEnvironments[_platform.name] = Object.assign({}, _platform, {events: this.k8sEnvironments[_platform.name].events});
    } else {
      this.k8sEnvironments[_platform.name] = _platform;
    }
  }
  
  onDeletePlatform(_platformName: string): void {
    this.notifs.info("DELETE SUCCESSFUL", `Environement ${_platformName} has been successfuly deleted!`);
    delete this.k8sEnvironments[_platformName];
  }
  
  message(_message: any): void {
    // if(_message.status == 'failure')
    // this.notifsCenter.create('Failure!', _message.message, 'error');
    
    // else if(_message.status == 'success')
    // this.notifsCenter.create('Success!', _message.message, 'success');
    
    // else if(_message.status == 'info')
    // this.notifsCenter.create('Info!', _message.message, 'info');
  }
}
