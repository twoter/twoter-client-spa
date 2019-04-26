import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs';

@Injectable()
export class LoggedInGuard implements CanActivate {
  private subscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.verifyUserIsLoggedIn()
      .map(resp => {
        if (200 === resp.status) {
          this.router.navigate(['/home']);
        }

        return Observable.of(true);
      })
      .catch((error) => {
        return Observable.of(true);
      });
  }
}
