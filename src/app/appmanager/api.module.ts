import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Configuration } from './configuration';

import { ApiVersionsService } from './api/apiVersions.service';
import { ComponentsService } from './api/components.service';
import { DefaultService } from './api/default.service';
import { GroupsService } from './api/groups.service';
import { ImplementationsService } from './api/implementations.service';
import { PipelinesService } from './api/pipelines.service';
import { RepositoriesService } from './api/repositories.service';

@NgModule({
  imports:      [ CommonModule, HttpClientModule ],
  declarations: [],
  exports:      [],
  providers: [
    ApiVersionsService,
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
        }
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import your base AppModule only.');
        }
    }
}
