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
import { CatalogEntryPackage } from './catalogEntryPackage';
import { Resource } from './resource';


export interface CatalogEntry extends Resource { 
    /**
     * Description
     */
    description?: string;
    /**
     * Icon's URL
     */
    icon?: string;
    packageTemplate?: any;
    packages?: Array<CatalogEntryPackage>;
}
