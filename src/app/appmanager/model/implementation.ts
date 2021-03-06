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
import { Asset } from './asset';
import { BinaryRepository } from './binaryRepository';
import { CatalogEntry } from './catalogEntry';
import { Component } from './component';
import { ImplementationVersion } from './implementationVersion';
import { Pipeline } from './pipeline';
import { SourceRepository } from './sourceRepository';


export interface Implementation extends Asset { 
    component?: Component;
    description?: string;
    language?: any;
    title?: string;
    versions?: Array<ImplementationVersion>;
}
