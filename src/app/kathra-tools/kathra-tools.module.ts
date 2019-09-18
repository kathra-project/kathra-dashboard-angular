import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggerService } from './services/logger.service';
import { AsArrayPipe } from './services/as-array.pipe';
import { ColorPickerService } from './services/color-picker.service';
export { KathraElementStatusService } from './services/kathra-element-status.service';
import { MulticritInputFilterComponent } from './components/multicrit-input-filter/multicrit-input-filter.component';
import { MultivalInputComponent } from './components/multival-input/multival-input.component';
import { NotAuthorizedInterceptor } from './services/not-authorized.interceptor';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MulticritInputFilterComponent,
    MultivalInputComponent,
    AsArrayPipe
  ],
  exports: [
    MulticritInputFilterComponent,
    MultivalInputComponent,
    AsArrayPipe
  ]
})
export class KathraToolsModule { }
