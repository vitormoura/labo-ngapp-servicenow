import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { SnAuthService } from "./sn-auth.service";
import { inject } from "@angular/core";

export const snUserAuthenticated: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const authService = inject(SnAuthService)
        return authService.checkUserAuthentication()
    };