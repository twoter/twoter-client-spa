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
export class AuthGuard implements CanActivate {
  private subscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.verifyUserIsLoggedIn()
      .map(e => {
        if (e) {
          return true;
        }
      })
      .catch((error) => {
        this.router.navigate(['/login']);

        return Observable.of(false);
      });
  }
}
