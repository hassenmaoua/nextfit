import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { first, Observable, Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { Dialog } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DividerModule } from 'primeng/divider';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [Dialog, ButtonModule, CheckboxModule, InputTextModule, PasswordModule, RouterModule, RippleModule, CommonModule, FormsModule, ReactiveFormsModule, IconFieldModule, InputIconModule, DividerModule],
    templateUrl: './register.component.html',
    styleUrl: '../../styles.scss'
})
export class RegisterComponent implements OnInit, OnDestroy {
    registerForm!: FormGroup;
    isLoading$: Observable<boolean>;
    visible = false;

    private destroy$ = new Subject<void>();

    constructor(
        private authService: AuthService,
        private router: Router,
        private loadingService: LoadingService
    ) {
        this.isLoading$ = this.authService.isLoading$;
    }

    ngOnInit(): void {
        console.log('RegisterComponent initialized');
        this.initForm();
    }

    ngOnDestroy(): void {
        console.log('RegisterComponent destroyed');
        this.destroy$.next();
        this.destroy$.complete();
    }

    get f() {
        return this.registerForm.controls;
    }

    private initForm(): void {
        this.registerForm = new FormGroup({
            email: new FormControl(null, [Validators.required]), // Validators.email
            password: new FormControl(null, [Validators.required, Validators.minLength(3)]),
            rememberMe: new FormControl(false)
        });
    }

    submit(): void {
        if (this.registerForm.invalid || this.f['rememberMe'].value === false) {
            this.registerForm.markAllAsTouched();
            return;
        }

        this.loadingService.startLoading();

        const { email, password } = this.registerForm.value;

        this.authService
            .registration(email, password)
            .pipe(takeUntil(this.destroy$), first())
            .subscribe({
                next: (user) => {
                    if (user?.email) {
                        this.router.navigate(['/auth/activate-account'], {
                            queryParams: { reload: new Date().getTime() }
                        });
                    } else {
                        this.authService.showError('Unexpected error. Please try again.');
                    }
                },
                error: (err: Error) => {
                    this.loadingService.stopLoading();
                    this.authService.showError(err.message);
                },
                complete: () => {
                    this.loadingService.stopLoading();
                }
            });
    }

    showTerms(): void {
        this.visible = true;
    }
}
