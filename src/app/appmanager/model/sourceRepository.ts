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
import { Resource } from './resource';


export interface SourceRepository extends Resource { 
    provider?: string;
    providerId?: string;
    path?: string;
    sshUrl?: string;
    httpUrl?: string;
    webUrl?: string;
    branchs?: Array<string>;
}
