import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';

export const AuthActivave: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  return route.url.length == 0 || inject(CommonService).logged() ? true : inject(Router).parseUrl("/admin")
}