import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { FieldComponent } from '../../../shared/components/field/field.component';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { FieldConfig } from '../../../models/form-builder/form-config.model';
import { profileConfig } from '../../../core/profile-form.config';
import { CommonModule } from '@angular/common';
import { FieldService } from '../../../services/field.service';
import { UserDTO } from '../../models/user.model';

@Component({
    selector: 'app-complete',
    imports: [CommonModule, ReactiveFormsModule, RouterModule, ButtonModule, InputTextModule, FieldComponent, DatePickerModule],
    templateUrl: 'registration-complete.component.html'
})
export class RegistrationCompleteComponent implements OnInit, OnDestroy {
    private readonly unsubscribe: Subscription[] = [];

    fields: FieldConfig[] = profileConfig;
    formGoup!: FormGroup;
    isLoading$: Observable<boolean>;

    genderOptions = [
        { label: 'Male', value: 'MALE' },
        { label: 'Female', value: 'FEMALE' }
    ];

    constructor(
        private readonly router: Router,
        private readonly authService: AuthService,
        private readonly fieldService: FieldService
    ) {
        this.isLoading$ = authService.isLoading$;
    }

    ngOnInit(): void {
        this.initForm();
    }

    ngOnDestroy(): void {
        this.unsubscribe.forEach((sub) => sub.unsubscribe());
    }

    initForm() {
        this.formGoup = this.fieldService.createFormGroup(this.fields);
    }
    submitChange() {
        const { firstName, lastName, birthDate, phone, currentActivity, height, weight, gender } = this.formGoup.value;

        const subsc = this.authService
            .complet({
                firstName,
                lastName,
                birthDate,
                phone,
                currentActivity,
                height,
                weight,
                gender
            })
            .subscribe({
                next: (res: UserDTO) => {
                    this.authService.currentUserSubject.next(res);
                    this.router.navigate(['/home']);
                },
                error: (error: any) => {
                    console.error('failed:', error);
                }
            });
        this.unsubscribe.push(subsc);
    }
}
