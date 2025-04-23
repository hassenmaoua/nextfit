import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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

@Component({
    selector: 'app-reset-password',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, ButtonModule, PasswordModule, FloatLabelModule, Message],
    templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {
    changePasswordForm!: FormGroup;

    submitState: SubmitStates = SubmitStates.NotSubmitted;
    states = SubmitStates;
    isLoading$: Observable<boolean>;
    isLoadingSubject: BehaviorSubject<boolean>;

    submitted: boolean = false;

    token!: string;

    // private fields
    private unsubscribe: Subscription[] = [];
    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private route: ActivatedRoute
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

    // convenience getter for easy access to form fields
    get f() {
        return this.changePasswordForm.controls;
    }

    initForm() {
        this.changePasswordForm = this.fb.group(
            {
                token: [this.token, Validators.compose([Validators.required])],
                password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
                cPassword: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])]
            },
            {
                validator: ConfirmPasswordValidator.MatchPassword
            }
        );
    }

    submitChange() {
        this.isLoadingSubject.next(true);
        const password = this.f['password'].value;
        this.submitState = SubmitStates.NotSubmitted;
        const changePasswordSubscr = this.authService.changePassword(this.token, password).subscribe(
            (response: any) => {
                console.log('Password change request successful:', response);
                this.submitState = SubmitStates.NoError;
                this.isLoadingSubject.next(false);
            },
            (error: any) => {
                console.error('Password change request failed:', error);
                this.submitState = SubmitStates.HasError;
                this.isLoadingSubject.next(false);
            }
        );
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
