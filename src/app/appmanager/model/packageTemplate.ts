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
import { PackageTemplateArgument } from './packageTemplateArgument';


export interface PackageTemplate { 
    /**
     * Name
     */
    name?: string;
    /**
     * Catalog entry arguments
     */
    arguments?: Array<PackageTemplateArgument>;
}
