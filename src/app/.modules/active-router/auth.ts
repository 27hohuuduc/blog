import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { isDebug } from 'src/api';
import { CommonService } from 'src/app/common.service';

export const AuthActivave: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  return isDebug ?  true : route.url.length == 0 || inject(CommonService).logged() ? true : inject(Router).parseUrl("/login")
}