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
import { CatalogEntryTemplateArgument } from './catalogEntryTemplateArgument';


export interface CatalogEntryTemplate { 
    /**
     * Template Name
     */
    name?: string;
    /**
     * Template Label
     */
    label?: string;
    /**
     * CodeGen Argument
     */
    arguments?: Array<CatalogEntryTemplateArgument>;
}
