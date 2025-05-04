import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { first, Observable, Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { AutoFocusModule } from 'primeng/autofocus';

@Component({
    selector: 'app-login',
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, RouterModule, RippleModule, CommonModule, FormsModule, ReactiveFormsModule, IconFieldModule, InputIconModule, AutoFocusModule],
    templateUrl: './login.component.html',
    styleUrl: '../../styles.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
    defaultAuth: any = {
        email: 'ADMIN',
        password: 'ADMIN'
    };
    loginForm!: FormGroup;
    returnUrl!: string;
    isLoading$: Observable<boolean>;

    private destroy$ = new Subject<void>();

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private loadingService: LoadingService
    ) {
        this.isLoading$ = this.authService.isLoading$;
        // redirect to home if already logged in
        if (this.authService.currentUser) {
            this.router.navigate(['/home']);
        }
    }

    ngOnInit(): void {
        console.log('LoginComponent initialized');
        this.initForm();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'.toString()] || '/home';
    }

    ngOnDestroy() {
        console.log('LoginComponent destroyed');
        // this.destroy$.next();
        // this.destroy$.complete();
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    initForm(): void {
        const lastEmail = localStorage.getItem('lastUsedEmail') || '';
        this.loginForm = new FormGroup({
            email: new FormControl(this.defaultAuth.email, [Validators.required]), // Validators.email,
            password: new FormControl(this.defaultAuth.password, [Validators.required, Validators.minLength(3)]),
            staySignedIn: new FormControl(false)
        });
    }

    submit() {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }

        const { email, password, staySignedIn } = this.loginForm.value;
        this.loadingService.startLoading();

        this.authService
            .login(email, password, staySignedIn)
            .pipe(first(), takeUntil(this.destroy$))
            .subscribe({
                next: (user) => {
                    if (user?.email) {
                        if (this.loginForm.value.rememberMe) {
                            localStorage.setItem('lastUsedEmail', user.email);
                        }
                        this.router.navigate([this.returnUrl]);
                    } else {
                        this.authService.showError('Invalid login. Please check your credentials.');
                    }
                },
                error: (err) => {
                    const message = err?.error?.message || 'Login failed. Please try again later.';
                    console.error('Login error:', err);
                    this.authService.showError(message);
                },
                complete: () => this.loadingService.stopLoading()
            });
    }
}
