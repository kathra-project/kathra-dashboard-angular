import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { KathraComponent } from './kathra';
import { NotLoggedInAuthGuard } from './kathra-tools';

const routes: Routes = [
  { path: '', component: WelcomeComponent, canActivate: [NotLoggedInAuthGuard] },
  { path: 'kathra', loadChildren: './kathra/kathra.module#KathraModule'},
  { path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(routes);