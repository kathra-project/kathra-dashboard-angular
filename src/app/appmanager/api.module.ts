import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { ApiVersionsService } from './api/apiVersions.service';
import { CatalogEntriesService } from './api/catalogEntries.service';
import { ComponentsService } from './api/components.service';
import { DefaultService } from './api/default.service';
import { GroupsService } from './api/groups.service';
import { ImplementationsService } from './api/implementations.service';
import { PipelinesService } from './api/pipelines.service';
import { RepositoriesService } from './api/repositories.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    ApiVersionsService,
    CatalogEntriesService,
    ComponentsService,
    DefaultService,
    GroupsService,
    ImplementationsService,
    PipelinesService,
    RepositoriesService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
