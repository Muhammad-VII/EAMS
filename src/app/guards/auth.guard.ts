import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _AuthService: AuthService = inject(AuthService);
  const _Router: Router = inject(Router);
  if (_AuthService.isLoggedIn) {
    return true;
  } else {
    _Router.navigate(['/login']);
    return false;
  }
};
