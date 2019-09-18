import { RouterModule, Routes } from '@angular/router';

import { KathraComponent } from './components/kathra/kathra.component';
import { ApplicationsComponent } from './components/applications/applications.component';
import { AppHomeComponent } from './components/applications/app-home/app-home.component';
import { NewAppComponent } from './components/applications/new-app/new-app.component';
import { NewAppCompComponent } from './components/applications/new-app/new-app-comp/new-app-comp.component';
import { CreateAppApiComponent } from './components/applications/new-app/new-app-api/create-app-api/create-app-api.component';
import { UpdateAppApiComponent } from './components/applications/new-app//new-app-api/update-app-api/update-app-api.component';
import { NewAppImplemComponent } from './components/applications/new-app/new-app-implem/new-app-implem.component';
import { ComponentDetailsComponent } from './components/applications/component-details/component-details.component';
import { ImplementationDetailsComponent } from './components/applications/implementation-details/implementation-details.component';
import { EnvironmentsComponent } from './components/environments/environments.component';
import { EnvHomeComponent } from './components/environments/env-home/env-home.component';
import { EnvironmentsDashboardComponent } from './components/environments/environments-dashboard/environments-dashboard.component';
import { NewEnvComponent } from './components/environments/new-env/new-env.component';
import { NewEnvInfosComponent } from './components/environments/new-env/new-env-infos/new-env-infos.component';
import { NewEnvAppsComponent } from './components/environments/new-env/new-env-apps/new-env-apps.component';
import { NewEnvConfigComponent } from './components/environments/new-env/new-env-config/new-env-config.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { DatasourcesComponent } from './components/datasources/datasources.component';

import { NotLoggedInAuthGuard } from '../kathra-tools';

const routes: Routes = [
  { 
    path: 'kathra', 
    component: KathraComponent,
    canActivate: [NotLoggedInAuthGuard],
    canActivateChild: [NotLoggedInAuthGuard],
    children: [
      {
        path: 'applications', 
        component: ApplicationsComponent,
        data: {
          animation: {
            value: 'applications',
          }
        },
        children: [
          {
            path: '',
            component: AppHomeComponent
          },
          {
            path: 'component/:id',
            component: ComponentDetailsComponent,
          },
          {
            path: 'component/:parentComponentId/implementation/:implemId',
            component: ImplementationDetailsComponent,
          },
          {
            path: 'new',
            component: NewAppComponent,
            children: [
              {
                path: 'component',
                component: NewAppCompComponent
              },
              {
                path: 'api',
                component: CreateAppApiComponent
              },
              {
                path: 'implementation',
                component: NewAppImplemComponent
              }
            ]
          },
          {
            path: 'update',
            component: NewAppComponent,
            children: [
              {
                path: 'api',
                component: UpdateAppApiComponent
              }
            ]
          }
        ]
      },
      { 
        path: 'environments', 
        component: EnvironmentsComponent,
        data: {
          animation: {
            value: 'environments',
          }
        },
        children: [
          {
            path: '',
            component: EnvHomeComponent
          },
          {
            path: 'dashboard',
            component: EnvironmentsDashboardComponent
          },
          {
            path: 'new',
            component: NewEnvComponent,
            children: [
              {
                path: 'information',
                component: NewEnvInfosComponent
              },
              {
                path: 'applications',
                component: NewEnvAppsComponent
              },
              {
                path: 'configure',
                component: NewEnvConfigComponent
              }
            ]
          }
        ]
      },
      { 
        path: 'catalog', 
        component: CatalogComponent,
        data: {
          animation: {
            value: 'catalog',
          }
        }
      },
      { 
        path: 'datasources', 
        component: DatasourcesComponent,
        data: {
          animation: {
            value: 'datasources',
          }
        }
      }
    ]
    /*children: [
      {
        path: '',
        children: [
          { 
            path: 'applications', 
            component: ApplicationsComponent,
            data: {
              animation: {
                value: 'applications',
              }
            }
          },
          { 
            path: 'environments', 
            component: EnvironmentsComponent,
            data: {
              animation: {
                value: 'environments',
              }
            }
          },
          { 
            path: 'catalog', 
            component: CatalogComponent,
            data: {
              animation: {
                value: 'catalog',
              }
            }
          },
          { 
            path: 'datasources', 
            component: DatasourcesComponent,
            data: {
              animation: {
                value: 'datasources',
              }
            }
          }
        ]
      }
    ]*/
  }
];

export const routing = RouterModule.forChild(routes);