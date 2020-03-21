import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './kathra.routing';

import { ApplicationsComponent } from './components/applications/applications.component';
import { EnvironmentsComponent } from './components/environments/environments.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { DatasourcesComponent } from './components/datasources/datasources.component';
import { NewAppComponent } from './components/applications/new-app/new-app.component';
import { NewCatalogEntryComponent } from './components/catalog/new-catalogentry/new-catalogentry.component';
import { KathraControlComponent } from './components/kathra/kathra-control/kathra-control.component';
import { KathraComponent } from './components/kathra/kathra.component';
import { KathraDataModule } from '../kathra-data';
import { KathraToolsModule } from '../kathra-tools';
import { KathraModalsModule } from '../kathra-modals';
import { KathraSidebarsModule } from '../kathra-sidebars';
import { AppHomeComponent } from './components/applications/app-home/app-home.component';

import { NgxMdModule } from 'ngx-md';

import { NewEnvService } from './services/new-env.service';
import { NewAppService } from './services/new-app.service';
import { EnvironmentsDashboardComponent } from './components/environments/environments-dashboard/environments-dashboard.component';
import { NewEnvComponent } from './components/environments/new-env/new-env.component';
import { EnvHomeComponent } from './components/environments/env-home/env-home.component';
import { NewEnvInfosComponent } from './components/environments/new-env/new-env-infos/new-env-infos.component';
import { NewEnvAppsComponent } from './components/environments/new-env/new-env-apps/new-env-apps.component';
import { NewEnvConfigComponent } from './components/environments/new-env/new-env-config/new-env-config.component';
import { CatalogueExplorerComponent } from './components/explorers/catalogue-explorer/catalogue-explorer.component';
import { ComponentDetailsComponent } from './components/applications/component-details/component-details.component';
import { HighlightJsModule } from 'angular-highlight-js';
import { NewAppCompComponent } from './components/applications/new-app/new-app-comp/new-app-comp.component';
import { CreateAppApiComponent } from './components/applications/new-app/new-app-api/create-app-api/create-app-api.component';
import { UpdateAppApiComponent } from './components/applications/new-app/new-app-api/update-app-api/update-app-api.component';
import { FormAppApiComponent } from './components/applications/new-app/new-app-api/form-app-api/form-app-api.component';
import { NewAppImplemComponent } from './components/applications/new-app/new-app-implem/new-app-implem.component';
import { ImplementationDetailsComponent } from './components/applications/implementation-details/implementation-details.component';
import { PipelineWidgetComponent } from './components/applications/implementation-details/pipeline-widget/pipeline-widget.component';
import { SourceRepositoryWidgetComponent } from './components/applications/implementation-details/source-repository-widget/source-repository-widget.component';

@NgModule({
  imports: [
    NgxMdModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    KathraDataModule,
    KathraModalsModule,
    KathraSidebarsModule,
    KathraToolsModule,
    HighlightJsModule,
    routing
  ],
  declarations: [
    KathraComponent,
    ApplicationsComponent,
    EnvironmentsComponent,
    CatalogComponent,
    DatasourcesComponent,
    KathraControlComponent,
    NewAppComponent,
    NewCatalogEntryComponent,
    AppHomeComponent,
    EnvironmentsDashboardComponent,
    NewEnvComponent,
    EnvHomeComponent,
    NewEnvInfosComponent,
    NewEnvAppsComponent,
    NewEnvConfigComponent,
    CatalogueExplorerComponent,
    ComponentDetailsComponent,
    NewAppCompComponent,
    CreateAppApiComponent,
    NewAppImplemComponent,
    ImplementationDetailsComponent,
    UpdateAppApiComponent,
    FormAppApiComponent,
    PipelineWidgetComponent,
    SourceRepositoryWidgetComponent
  ],
  providers: [
    NewEnvService,
    NewAppService
  ]
})
export class KathraModule { }
