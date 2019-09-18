import {throwError as observableThrowError,  Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppConfig {

  private config: Object = null;
  private env:    Object = null;

  constructor(private http: HttpClient) {}

  public getConfig(key: any) {
      return this.config[key];
  }

  public load() {
    return new Promise((resolve, reject) => {

      this.http.get('/api/config')
      .pipe(
        catchError((error: any):any => {
          resolve(true);
          return observableThrowError(error.json().error || 'Server error');
        })
      )
      .subscribe((responseData) => {
        this.config = responseData;
        resolve(true);
      });
    });
  }
}

export const KATHRA_VERSION = new InjectionToken<any>('kathra-version');