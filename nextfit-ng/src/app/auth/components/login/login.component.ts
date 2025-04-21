import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { first, Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UserDTO } from '../../models/user.model';
import { LoadingService } from '../../../shared/services/loading.service';
import { Dialog } from 'primeng/dialog';
import { Image } from 'primeng/image';

@Component({
    selector: 'app-login',
    imports: [Image, Dialog, ButtonModule, CheckboxModule, InputTextModule, PasswordModule, RouterModule, RippleModule, CommonModule, FormsModule, ReactiveFormsModule],
    providers: [Router],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
    showErrorDialog: boolean = false;
    errorMessage = '';
    errorImage = 'assets/images/angle-triangle.png';

    defaultAuth: any = {
        email: 'ADMIN',
        password: 'ADMIN'
    };
    checked: boolean = false;
    loginForm!: FormGroup;
    returnUrl!: string;
    isLoading$!: Observable<boolean>;

    // private fields
    private unsubscribe: Subscription[] = [];

    constructor(
        private fb: FormBuilder,
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
        this.initForm();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'.toString()] || '/home';
    }

    ngOnDestroy() {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    initForm() {
        // Load the last used email from local storage
        const lastUsedEmail = localStorage.getItem('lastUsedEmail') || this.defaultAuth.email;

        this.loginForm = new FormGroup({
            email: new FormControl(lastUsedEmail, [Validators.required]),
            password: new FormControl(this.defaultAuth.password, [Validators.required]),
            rememberMe: new FormControl(false) // Add this control
        });
    }

    submit() {
        if (this.loginForm.invalid) {
            Object.values(this.loginForm.controls).forEach((control) => {
                control.markAsTouched();
            });
            return;
        }
        this.loadingService.startLoading();
        const loginSubscr = this.authService
            .login(this.f['email'].value, this.f['password'].value)
            .pipe(first())
            .subscribe((user: UserDTO | undefined) => {
                if (user) {
                    if (user.email) localStorage.setItem('lastUsedEmail', user.email);
                    this.router.navigate([this.returnUrl]);
                } else {
                    this.showError('Invalid credentials. Please try again.');
                }
                this.loadingService.stopLoading();
            });
        this.unsubscribe.push(loginSubscr);
    }

    showError(message: string) {
        this.errorMessage = message;
        this.showErrorDialog = true;
    }
}
