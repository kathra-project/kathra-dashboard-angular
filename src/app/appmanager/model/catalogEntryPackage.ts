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
import { Asset } from './asset';
import { BinaryRepository } from './binaryRepository';
import { CatalogEntry } from './catalogEntry';
import { CatalogEntryPackageVersion } from './catalogEntryPackageVersion';
import { Pipeline } from './pipeline';
import { SourceRepository } from './sourceRepository';


export interface CatalogEntryPackage extends Asset { 
    catalogEntry?: CatalogEntry;
    packageType?: any;
    /**
     * Provider
     */
    provider?: string;
    /**
     * ProviderId
     */
    providerId?: string;
    /**
     * String
     */
    url?: string;
    versions?: Array<CatalogEntryPackageVersion>;
}