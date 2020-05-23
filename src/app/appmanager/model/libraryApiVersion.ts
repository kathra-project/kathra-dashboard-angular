/**
 * Kathra Applications Manager
 * Kathra Applications Manager
 *
 * OpenAPI spec version: 1.2.0-SNAPSHOT
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { ApiVersion } from './apiVersion';
import { Library } from './library';
import { Resource } from './resource';


export interface LibraryApiVersion extends Resource { 
    library?: Library;
    apiVersion?: ApiVersion;
    apiRepositoryStatus?: any;
    pipelineStatus?: any;
}
