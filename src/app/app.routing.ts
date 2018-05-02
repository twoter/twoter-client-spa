import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { EditComponent } from './user/edit/edit.component';
import { SearchComponent } from './search/search.component';

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
    path: 'search',
    component: SearchComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit',
    component: EditComponent,
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
