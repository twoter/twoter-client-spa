import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [LoggedInGuard]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

export const routing = RouterModule.forRoot(appRoutes, {
  // useHash: true
});
