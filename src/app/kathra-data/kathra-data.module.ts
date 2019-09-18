import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { KathraAppComponent } from './components/kathra-app/kathra-app.component';
import { KathraAppConfComponent } from './components/kathra-app-conf/kathra-app-conf.component';
import { KathraEnvComponent } from './components/kathra-env/kathra-env.component';
import { KathraCompComponent } from './components/kathra-comp/kathra-comp.component';
import { KathraImplemComponent } from './components/kathra-implem/kathra-implem.component';

import { KathraToolsModule } from '../kathra-tools';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    KathraToolsModule,
    RouterModule
  ],
  declarations: [
    KathraAppComponent,
    KathraEnvComponent,
    KathraAppConfComponent,
    KathraCompComponent,
    KathraImplemComponent
  ],
  providers: [
  ],
  exports: [
    KathraAppComponent, 
    KathraAppConfComponent, 
    KathraEnvComponent,
    KathraCompComponent,
    KathraImplemComponent
  ]
})
export class KathraDataModule { }
