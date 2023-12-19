import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CommonService } from '.';

export const AuthActivave: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  return environment.isDebug ?  true : route.url.length == 0 || inject(CommonService).logged() ? true : inject(Router).parseUrl("/login")
}