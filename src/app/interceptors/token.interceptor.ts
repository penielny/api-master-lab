import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authenticationService = inject(AuthenticationService)

  const newReq = req.clone({
    headers: req.headers.append('X-Authentication-Token', authenticationService.getToken() || ''),
  });
  return next(newReq);

};
