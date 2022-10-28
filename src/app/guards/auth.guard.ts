import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { isTokenExpired } from '../utils/is-token-expired';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    // private readonly navigationService: NavigationService,
    private readonly router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.authService.getToken();
    if (token) {
      let shouldGo = !isTokenExpired(token);
      if (!shouldGo) {
        this.authService.logout();
        return shouldGo;
      }
      if (!shouldGo && state.url !== '/dashboard') {
        this.router.navigate(['/dashboard']);
      }
      return shouldGo;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
