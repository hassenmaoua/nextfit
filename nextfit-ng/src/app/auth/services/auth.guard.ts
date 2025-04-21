import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { firstValueFrom, skipWhile, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
    private isInitialCheck = true;

    constructor(private authService: AuthService) {}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.isInitialCheck && !this.authService.currentUser) {
            this.isInitialCheck = false;
            const currentUser = await this.authService.getUserByToken();

            if (currentUser) {
                return true;
            }
        }

        if (this.authService.currentUser) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.authService.logout(state.url);
        return false;
    }
}
