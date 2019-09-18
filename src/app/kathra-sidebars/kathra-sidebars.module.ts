import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarsService } from './services/sidebars.service';
import { SidebarBackgroundDirective } from './directives/sidebar-background.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SidebarComponent,
    SidebarBackgroundDirective
  ],
  exports: [
    SidebarComponent,
    SidebarBackgroundDirective
  ],
  providers: [
    SidebarsService
  ]
})
export class KathraSidebarsModule { }
