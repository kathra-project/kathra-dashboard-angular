/**
 * Kathra Applications Manager
 * Kathra Applications Manager
 *
 * OpenAPI spec version: 1.0.0-RC-SNAPSHOT
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { Implementation } from '../model/implementation';
import { ImplementationParameters } from '../model/implementationParameters';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class ImplementationsService {

    protected basePath = 'https://localhost';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (let consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Create a new Implementation for the given ApiVersion
     * 
     * @param implementationParameters The parameters for the implementation to create
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createImplementation(implementationParameters?: ImplementationParameters, observe?: 'body', reportProgress?: boolean): Observable<Implementation>;
    public createImplementation(implementationParameters?: ImplementationParameters, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Implementation>>;
    public createImplementation(implementationParameters?: ImplementationParameters, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Implementation>>;
    public createImplementation(implementationParameters?: ImplementationParameters, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (kathra_auth) required
        if (this.configuration.accessToken) {
            let accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.post<Implementation>(`${this.basePath}/implementations`,
            implementationParameters,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get the component having the given id
     * 
     * @param componentId The ID of the Component to get the implementations from
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getComponentImplementations(componentId: string, observe?: 'body', reportProgress?: boolean): Observable<Array<Implementation>>;
    public getComponentImplementations(componentId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Implementation>>>;
    public getComponentImplementations(componentId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Implementation>>>;
    public getComponentImplementations(componentId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (componentId === null || componentId === undefined) {
            throw new Error('Required parameter componentId was null or undefined when calling getComponentImplementations.');
        }

        let headers = this.defaultHeaders;

        // authentication (kathra_auth) required
        if (this.configuration.accessToken) {
            let accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        return this.httpClient.get<Array<Implementation>>(`${this.basePath}/components/${encodeURIComponent(String(componentId))}/implementations`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get the Implementation having the given id
     * 
     * @param implementationId The ID of the Implementation to get
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getImplementationById(implementationId: string, observe?: 'body', reportProgress?: boolean): Observable<Implementation>;
    public getImplementationById(implementationId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Implementation>>;
    public getImplementationById(implementationId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Implementation>>;
    public getImplementationById(implementationId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (implementationId === null || implementationId === undefined) {
            throw new Error('Required parameter implementationId was null or undefined when calling getImplementationById.');
        }

        let headers = this.defaultHeaders;

        // authentication (kathra_auth) required
        if (this.configuration.accessToken) {
            let accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        return this.httpClient.get<Implementation>(`${this.basePath}/implementations/${encodeURIComponent(String(implementationId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get the Implementations list
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getImplementations(observe?: 'body', reportProgress?: boolean): Observable<Array<Implementation>>;
    public getImplementations(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Implementation>>>;
    public getImplementations(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Implementation>>>;
    public getImplementations(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (kathra_auth) required
        if (this.configuration.accessToken) {
            let accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        return this.httpClient.get<Array<Implementation>>(`${this.basePath}/implementations`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
