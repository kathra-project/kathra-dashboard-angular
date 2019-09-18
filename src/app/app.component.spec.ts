import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './kathra-navbar';
import { RouterOutlet } from '@angular/router';
import { SimpleNotificationsComponent, NotificationComponent } from 'angular2-notifications';

import { LoggerService } from './kathra-tools/services/logger.service';
import { DefaultService as AppManagerService } from './appmanager';
import { KeycloakService } from 'keycloak-angular';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavbarComponent,
        RouterOutlet,
        SimpleNotificationsComponent,
        NotificationComponent
      ],
      providers: [
        LoggerService,
        AppManagerService,
        KeycloakService,
        HttpClient,
        HttpHandler
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
