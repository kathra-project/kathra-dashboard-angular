/**
 * Kathra Applications Manager
 * Kathra Applications Manager
 *
 * OpenAPI spec version: 1.1.0-SNAPSHOT
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { Component } from './component';
import { ImplementationVersion } from './implementationVersion';
import { LibraryApiVersion } from './libraryApiVersion';
import { Resource } from './resource';


export interface ApiVersion extends Resource { 
    component?: Component;
    released?: boolean;
    version?: string;
    apiRepositoryStatus?: any;
    librariesApiVersions?: Array<LibraryApiVersion>;
    implementationsVersions?: Array<ImplementationVersion>;
}
