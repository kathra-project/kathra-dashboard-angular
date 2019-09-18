import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotAuthorizedInterceptor, NotLoggedInAuthGuard } from './kathra-tools';

import { ApiModule as AppManagerModule, BASE_PATH as APPMGR_BASE_PATH } from './appmanager';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { HighlightJsModule, HIGHLIGHT_JS } from 'angular-highlight-js';
import * as hljs from 'highlight.js/lib/highlight';
import * as hljs_yaml from 'highlight.js/lib/languages/yaml';

import { KathraModule } from './kathra';
import { KathraDataModule } from './kathra-data';
import { AppConfig, KATHRA_VERSION } from './app.config';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { KathraNavbarModule } from './kathra-navbar';
import { KathraSidebarsModule } from './kathra-sidebars';
import { WelcomeComponent } from './welcome/welcome.component';

import { KathraUserService } from './kathra-user';
import { LoggerService, CustomNotificationsService } from './kathra-tools';
import { ColorPickerService, ToolsService, KathraElementStatusService }   from './kathra-tools';
import { K8sWsService, WebSocketService } from './kathra-data';

import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { DefaultService as AppManagerService } from './appmanager';

export function highlightJsFactory() {
  hljs.registerLanguage('yaml', hljs_yaml);
  return hljs;
}
export function initializeAppConfig(config: AppConfig){
  return () => config.load();
}
export function initializeKeycloak(keycloak: KeycloakService){
  return () => keycloak.init({config: 'assets/keycloak.json'});
}
export function appMgrServiceBasePathFactory(config: AppConfig){
  return config.getConfig('app_manager_endpoint');
}
export function kathraVersionConfigurationFactory(config: AppConfig){
  return config.getConfig('kathra_version');
}

@NgModule({
  imports: [
    HttpClientModule,
    KeycloakAngularModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    KathraModule,
    KathraDataModule,
    KathraNavbarModule,
    KathraSidebarsModule,
    AppManagerModule,
    SimpleNotificationsModule.forRoot(),
    HighlightJsModule.forRoot({
      provide: HIGHLIGHT_JS,
      useFactory: highlightJsFactory
    }),
    routing
  ],
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  providers: [
    AppConfig,
    KeycloakService,
    NotLoggedInAuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: NotAuthorizedInterceptor, multi: true},
    { provide: APP_INITIALIZER, useFactory: initializeAppConfig, deps: [AppConfig], multi: true },
    { provide: APP_INITIALIZER, useFactory: initializeKeycloak, deps: [KeycloakService], multi: true },
    { provide: APPMGR_BASE_PATH, useFactory: appMgrServiceBasePathFactory, deps: [AppConfig] },
    { provide: KATHRA_VERSION, useFactory: kathraVersionConfigurationFactory, deps: [AppConfig] },
    AppManagerService,
    LoggerService,
    ColorPickerService,
    KathraElementStatusService,
    ToolsService,
    WebSocketService,
    K8sWsService,
    KathraUserService,
    CustomNotificationsService
  ],
  entryComponents: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
