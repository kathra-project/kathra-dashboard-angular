/**
 * Kathra Core Model
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0-RC-SNAPSHOT
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { CatalogResourceParameter } from './catalogResourceParameter';
import { Resource } from './resource';


export interface CatalogResource {
    id?: string;
    name?: string;
    metadata?: { [key: string]: any; };
    version?: string;
    licence?: string;
    teaser?: string;
    description?: string;
    websiteUrl?: string;
    iconUrl?: string;
    categories?: Array<string>;
    parameters?: Array<CatalogResourceParameter>;
}
