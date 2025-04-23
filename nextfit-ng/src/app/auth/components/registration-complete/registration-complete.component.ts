import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { FieldComponent } from '../../../shared/components/field/field.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-complete',
    imports: [ReactiveFormsModule, RouterModule, ButtonModule, InputTextModule, FieldComponent, DatePickerModule],
    templateUrl: 'registration-complete.component.html'
})
export class RegistrationCompleteComponent implements OnInit, OnDestroy {
    formGoup!: FormGroup;
    isLoading$: Observable<boolean>;
    isLoadingSubject: BehaviorSubject<boolean>;

    genderOptions = [
        { label: 'Male', value: 'MALE' },
        { label: 'Female', value: 'FEMALE' }
    ];

    constructor(
        private router: Router,
        private authService: AuthService
    ) {
        this.isLoadingSubject = new BehaviorSubject<boolean>(false);
        this.isLoading$ = this.isLoadingSubject.asObservable();
    }
    ngOnInit(): void {
        this.initForm();
    }

    ngOnDestroy(): void {}

    initForm() {
        this.formGoup = new FormGroup({
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            birthDate: new FormControl(null, [Validators.required]),
            phone: new FormControl(null, [Validators.required]),
            gender: new FormControl('', [Validators.required])
        });
    }

    submitChange() {
        this.isLoadingSubject.next(true);
        const { firstName, lastName, birthDate, phone, gender } = this.formGoup.value;

        const changePasswordSubscr = this.authService.complet(firstName, lastName, birthDate, phone, gender).subscribe(
            (response: any) => {
                this.isLoadingSubject.next(false);
                this.router.navigate(['/home']);
            },
            (error: any) => {
                console.error('failed:', error);
                this.isLoadingSubject.next(false);
            }
        );
        // this.unsubscribe.push(changePasswordSubscr);
    }
}
