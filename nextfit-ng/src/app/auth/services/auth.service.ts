import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription, lastValueFrom } from 'rxjs';
import { map, catchError, switchMap, finalize, take } from 'rxjs/operators';
import { environment } from '../../../environment/environment';
import { UserDTO } from '../models/user.model';
import { Router } from '@angular/router';
import { AuthHTTPService } from './auth-http.service';
import { AuthModel } from '../models/auth.model';
import { layoutConfig } from '../../layout/service/layout.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnDestroy {
    // private fields
    private unsubscribe: Subscription[] = [];
    private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

    // public fields
    currentUser$: Observable<UserDTO | undefined>;
    isLoading$: Observable<boolean>;
    currentUserSubject: BehaviorSubject<UserDTO | undefined>;
    isLoadingSubject: BehaviorSubject<boolean>;

    get currentUser(): UserDTO | undefined {
        return this.currentUserSubject.value;
    }

    set currentUser(user: UserDTO) {
        this.currentUserSubject.next(user);
    }

    constructor(
        private authHttpService: AuthHTTPService,
        private router: Router
    ) {
        this.isLoadingSubject = new BehaviorSubject<boolean>(false);
        this.currentUserSubject = new BehaviorSubject<UserDTO | undefined>(undefined);
        this.currentUser$ = this.currentUserSubject.asObservable();
        this.isLoading$ = this.isLoadingSubject.asObservable();
    }

    // public methods
    login(email: string, password: string): Observable<UserDTO | undefined> {
        this.isLoadingSubject.next(true);
        return this.authHttpService.login(email, password).pipe(
            map((auth: AuthModel) => {
                const result = this.setAuthFromLocalStorage(auth);
                return result;
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
        // Clear local storage
        localStorage.removeItem(this.authLocalStorageToken);

        // Reset current user
        this.currentUserSubject.next(undefined);

        this.router.navigate(['/auth/login'], {
            queryParams: { returnUrl: returnUrl }
        });
    }

    async getUserByToken(): Promise<UserDTO | undefined> {
        const auth = this.getAuthFromLocalStorage();
        if (!auth || !auth.refreshToken) {
            return undefined;
        }

        this.isLoadingSubject.next(true);

        try {
            const user = await lastValueFrom(
                this.authHttpService.getUserByToken(auth.refreshToken).pipe(
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
    // registration(user: RegistrationRequest): Observable<boolean> {
    //     this.isLoadingSubject.next(true);

    //     return this.authHttpService.createUser(user).pipe(
    //         map(() => true), // Mapping createUser success to true
    //         catchError((err) => {
    //             console.error('Error during user registration:', err);
    //             return of(false); // Returning false in case of an error
    //         }),
    //         finalize(() => this.isLoadingSubject.next(false))
    //     );
    // }

    forgotPassword(email: string): Observable<boolean> {
        this.isLoadingSubject.next(true);
        return this.authHttpService.forgotPassword(email).pipe(finalize(() => this.isLoadingSubject.next(false)));
    }

    // private methods
    private setAuthFromLocalStorage(auth: AuthModel): boolean {
        // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
        if (auth && auth.authToken) {
            localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
            return true;
        }
        return false;
    }

    private getAuthFromLocalStorage(): AuthModel | undefined {
        try {
            const lsValue = localStorage.getItem(this.authLocalStorageToken);
            if (!lsValue) {
                return undefined;
            }

            const authData = JSON.parse(lsValue);
            return authData;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    ngOnDestroy() {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }
}
