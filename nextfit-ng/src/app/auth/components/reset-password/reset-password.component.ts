import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ConfirmPasswordValidator } from '../../initializer/confirm-password.validator';
import { PasswordModule } from 'primeng/password';

enum SubmitStates {
    NotSubmitted,
    HasError,
    NoError
}

interface ChangePasswordForm {
    token: FormControl<string>;
    password: FormControl<string>;
    cPassword: FormControl<string>;
}

@Component({
    selector: 'app-reset-password',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, ButtonModule, PasswordModule, FloatLabelModule, Message],
    templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
    changePasswordForm!: FormGroup;

    submitState: SubmitStates = SubmitStates.NotSubmitted;
    states = SubmitStates;
    isLoading$: Observable<boolean>;
    isLoadingSubject: BehaviorSubject<boolean>;

    submitted: boolean = false;

    token!: string;

    // private fields
    private readonly unsubscribe: Subscription[] = [];

    constructor(
        private readonly fb: FormBuilder,
        private readonly authService: AuthService,
        private readonly route: ActivatedRoute
    ) {
        const queryParamSubscr = this.route.queryParams.subscribe((params) => {
            this.token = params['token'];
        });
        this.unsubscribe.push(queryParamSubscr);
        this.isLoadingSubject = new BehaviorSubject<boolean>(false);
        this.isLoading$ = this.isLoadingSubject.asObservable();
    }

    ngOnInit(): void {
        this.initForm();
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.unsubscribe.forEach((sub) => sub.unsubscribe());

        // Complete the BehaviorSubject
        this.isLoadingSubject.complete();
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.changePasswordForm.controls;
    }

    initForm() {
        this.changePasswordForm = this.fb.group<ChangePasswordForm>(
            {
                token: this.fb.nonNullable.control(this.token, Validators.required),
                password: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
                cPassword: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)])
            },
            {
                validators: ConfirmPasswordValidator.MatchPassword
            } as AbstractControlOptions
        );
    }

    submitChange() {
        this.isLoadingSubject.next(true);
        const password = this.f['password'].value;
        this.submitState = SubmitStates.NotSubmitted;
        const changePasswordSubscr = this.authService.changePassword(this.token, password).subscribe({
            next: (response: any) => {
                console.log('Password change request successful:', response);
                this.submitState = SubmitStates.NoError;
                this.isLoadingSubject.next(false);
            },
            error: (error: any) => {
                console.error('Password change request failed:', error);
                this.submitState = SubmitStates.HasError;
                this.isLoadingSubject.next(false);
            }
        });
        this.unsubscribe.push(changePasswordSubscr);
    }

    tryAgain() {
        this.initForm();
        this.submitState = SubmitStates.NotSubmitted;
    }

    // Method to check if a field is invalid and has been interacted with
    isFieldInvalid(formGroup: FormGroup, fieldName: string): boolean {
        const fieldControl = formGroup.get(fieldName);
        return (fieldControl && fieldControl.invalid && (fieldControl.dirty || fieldControl.touched)) || false;
    }
}
