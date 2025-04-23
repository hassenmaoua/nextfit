import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    private router = inject(Router);

    constructor(private authService: AuthService) {}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        // First check if we have a cached currentUser
        if (!this.authService.currentUser) {
            await this.authService.getUserByToken();
        }

        // User is not authenticated at all
        if (!this.authService.currentUser) {
            return this.router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url } });
        }

        const isRegistrationCompleteRoute = state.url.includes('/auth/registration-complete');

        // Case 1: User hasn't completed registration
        if (!this.authService.currentUser.registrationComplete) {
            if (!isRegistrationCompleteRoute) {
                return this.router.createUrlTree(['/auth/registration-complete']);
            }
            return true; // Allow access to registration-complete
        }

        // Case 2: User has completed registration but tries to access registration-complete
        if (isRegistrationCompleteRoute) {
            return this.router.createUrlTree(['/']); // Redirect to home
        }

        // All other cases - allow access
        return true;
    }
}
