import { inject } from "@angular/core"
import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router"

/**
 * Convert parameter to web page address
 * @param route 
 * @param state 
 * @returns Url been query
 */
export const ConverterActivate: CanActivateFn = (route: ActivatedRouteSnapshot) => {
    const url = route.queryParams['url']
    
    return url ? inject(Router).parseUrl(url) : true
}