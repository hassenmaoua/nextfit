import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription, lastValueFrom, throwError } from 'rxjs';
import { map, catchError, switchMap, finalize, take } from 'rxjs/operators';
import { environment } from '../../../environment/environment';
import { UserDTO } from '../models/user.model';
import { Router } from '@angular/router';
import { AuthHTTPService } from './auth-http.service';
import { AuthModel } from '../models/auth.model';
import { layoutConfig } from '../../layout/service/layout.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';
import { UpdateProfileRequest } from '../../models/requests/update-profile-request.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnDestroy {
    // private fields
    private unsubscribe: Subscription[] = [];
    private authStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

    // public fields
    currentUser$: Observable<UserDTO | undefined>;
    isLoading$: Observable<boolean>;

    currentUserSubject: BehaviorSubject<UserDTO | undefined> = new BehaviorSubject<UserDTO | undefined>(undefined);
    isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    hasErrorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    errorMessage: BehaviorSubject<string> = new BehaviorSubject('');

    errorImage: string = 'assets/images/angle-triangle.png';

    get currentUser(): UserDTO | undefined {
        return this.currentUserSubject.value;
    }

    set currentUser(user: UserDTO) {
        this.currentUserSubject.next(user);
    }

    constructor(
        private authHttpService: AuthHTTPService,
        private userService: UserService,
        private router: Router,
        private cookieService: CookieService
    ) {
        this.currentUser$ = this.currentUserSubject.asObservable();
        this.isLoading$ = this.isLoadingSubject.asObservable();
    }

    // public methods
    login(email: string, password: string, staySignedIn: boolean): Observable<UserDTO | undefined> {
        this.isLoadingSubject.next(true);
        return this.authHttpService.login(email, password).pipe(
            map((auth: AuthModel) => {
                if (auth?.authToken) {
                    if (staySignedIn) {
                        const expiryDate = new Date();
                        expiryDate.setDate(expiryDate.getDate() + 7);
                        this.cookieService.set(this.authStorageToken, auth?.authToken, { expires: expiryDate, path: '/', secure: true, sameSite: 'Lax' });
                    } else {
                        this.cookieService.set(this.authStorageToken, auth?.authToken, { path: '/', secure: true, sameSite: 'Lax' });
                    }
                }
            }),
            switchMap(() => this.getUserByToken()),
            catchError((err) => {
                console.error('err', err);
                return of(undefined);
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }

    async logout(returnUrl?: string): Promise<void> {
        // Clear cookie storage
        this.cookieService.delete(this.authStorageToken, '/');

        // Reset current user
        this.currentUserSubject.next(undefined);
        location.reload();

        this.router.navigate(['/auth/login'], {
            queryParams: { returnUrl: returnUrl }
        });
    }

    async getUserByToken(): Promise<UserDTO | undefined> {
        const token = this.getAuthFromLocalStorage();
        if (!token) {
            return undefined;
        }

        this.isLoadingSubject.next(true);

        try {
            const user = await lastValueFrom(
                this.authHttpService.getUserByToken(token).pipe(
                    take(1) // Ensure the observable completes
                )
            );

            if (user) {
                this.currentUserSubject.next(user);
                return user;
            } else {
                await this.logout();
                return undefined;
            }
        } catch (error) {
            console.error('Failed to get user by token:', error);
            await this.logout();
            return undefined;
        } finally {
            this.isLoadingSubject.next(false);
        }
    }

    updateLayout(layoutConfig: layoutConfig) {
        if (!layoutConfig.id) {
            layoutConfig.id = this.currentUser?.config.id;
        }

        this.isLoadingSubject.next(true);

        this.authHttpService
            .updateLayout(layoutConfig)
            .pipe(
                map((res: layoutConfig) => {
                    localStorage.setItem('config', JSON.stringify(res));
                    return res;
                }),
                catchError((err) => {
                    console.error('Update layout error:', err);
                    return of(undefined);
                }),
                finalize(() => this.isLoadingSubject.next(false))
            )
            .subscribe();
    }

    // need create new user then login
    registration(email: string, password: string): Observable<any> {
        this.isLoadingSubject.next(true);

        return this.authHttpService.createUser({ email, password }).pipe(
            map((response) => response),
            catchError((err: HttpErrorResponse) => {
                const message = err?.error?.message || 'Unknown error during registration';
                return throwError(() => new Error(message)); // propagate error as Error
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }

    confirm(token: string): Observable<any> {
        this.isLoadingSubject.next(true);
        return this.authHttpService.confirm(token).pipe(finalize(() => this.isLoadingSubject.next(false)));
    }

    forgotPassword(email: string): Observable<boolean> {
        this.isLoadingSubject.next(true);
        return this.authHttpService.forgotPassword(email).pipe(finalize(() => this.isLoadingSubject.next(false)));
    }

    changePassword(token: string, password: any) {
        this.isLoadingSubject.next(true);
        return this.authHttpService.changePassword({ token, password }).pipe(finalize(() => this.isLoadingSubject.next(false)));
    }

    complet(formValue: UpdateProfileRequest) {
        this.isLoadingSubject.next(true);
        return this.userService.updateProfile(formValue).pipe(finalize(() => this.isLoadingSubject.next(false)));
    }

    showError(message: string) {
        this.errorMessage.next(message);
        this.hasErrorSubject.next(true);
    }

    closeError() {
        this.hasErrorSubject.next(false);
        this.errorMessage.next('');
    }

    getAuthFromLocalStorage(): string | undefined {
        try {
            const lsValue = this.cookieService.get(this.authStorageToken);
            if (!lsValue) {
                return undefined;
            }
            return lsValue;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    ngOnDestroy() {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }
}
