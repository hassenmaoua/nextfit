import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';

enum SubmitStates {
    NotSubmitted,
    HasError,
    NoError
}

@Component({
    selector: 'app-forgot-password',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, ButtonModule, InputTextModule, FloatLabelModule, Message],
    templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
    forgotPasswordForm!: FormGroup;

    submitState: SubmitStates = SubmitStates.NotSubmitted;
    SubmitStates = SubmitStates;
    isLoading$: Observable<boolean>;
    isLoadingSubject: BehaviorSubject<boolean>;

    submitted: boolean = false;

    // private fields
    private readonly unsubscribe: Subscription[] = [];
    constructor(
        private readonly fb: FormBuilder,
        private readonly authService: AuthService
    ) {
        this.isLoadingSubject = new BehaviorSubject<boolean>(false);
        this.isLoading$ = this.isLoadingSubject.asObservable();
    }

    ngOnInit(): void {
        this.initForm();
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.forgotPasswordForm.controls;
    }

    initForm() {
        this.forgotPasswordForm = this.fb.group({
            email: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(320)])]
        });
    }

    submitReset() {
        this.isLoadingSubject.next(true);
        this.submitState = SubmitStates.NotSubmitted;
        const forgotPasswordSubscr = this.authService.forgotPassword(this.f['email'].value).subscribe({
            next: (response: any) => {
                console.log('Password reset request successful:', response);
                this.submitState = SubmitStates.NoError;
                this.isLoadingSubject.next(false);
            },
            error: (error: any) => {
                console.error('Password reset request failed:', error);
                this.submitState = SubmitStates.HasError;
                this.isLoadingSubject.next(false);
            }
        });

        this.unsubscribe.push(forgotPasswordSubscr);
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
