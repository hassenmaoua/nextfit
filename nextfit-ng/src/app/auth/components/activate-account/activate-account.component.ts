import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject, tap, catchError, of, finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { InputOtpModule } from 'primeng/inputotp';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';

@Component({
    selector: 'app-activate-account',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, InputOtpModule, RouterModule, ButtonModule, Message],
    templateUrl: './activate-account.component.html'
})
export class ActivateAccountComponent implements OnInit {
    message = 'This is a very long test code';
    isOkay = false;
    submitted = false;
    isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    token: any;

    constructor(
        private readonly authService: AuthService,
        private readonly router: Router
    ) {}

    ngOnInit(): void {
        console.log('ActivateAccountComponent initialized');
        this.isLoading$.next(false);
    }

    private confirmAccount(token: string): void {
        this.isLoading$.next(true); // Signal that loading has started
        this.authService
            .confirm(token)
            .pipe(
                tap((res) => {
                    this.message = 'Your account has been successfully activated.\nNow you can proceed to login';
                    this.submitted = true;
                    this.isOkay = true;
                }),
                catchError((error) => {
                    if (error.status === 404) {
                        this.message = 'Invalid activation token, please make sure the token is correct.';
                    } else if (error.status === 406) {
                        this.message = 'Activation token has expired. A new token has been sent to the same email address.';
                    } else {
                        this.message = 'An unexpected error occurred.';
                    }
                    this.submitted = true;
                    this.isOkay = false;
                    return of(null); // Return observable to prevent error propagation
                }),
                finalize(() => {
                    this.isLoading$.next(false); // Signal that loading has ended
                })
            )
            .subscribe();
    }

    redirectToLogin(): void {
        this.router.navigate(['/']);
    }

    clear(): void {
        this.submitted = false;
        this.token = '';
    }

    onCodeCompleted(): void {
        if (this.token?.length == 6) {
            this.confirmAccount(this.token);
        }
    }
}
