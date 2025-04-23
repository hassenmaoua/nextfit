import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FieldComponent } from '../../shared/components/field/field.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'app-complete',
    standalone: true,
    imports: [ReactiveFormsModule, RouterModule, ButtonModule, InputTextModule, FieldComponent, DatePickerModule],
    template: `
        <div class="overflow-hidden">
            <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <form [formGroup]="formGoup">
                            <div class="flex flex-col items-center justify-center">
                                <div class="text-surface-700 dark:text-surface-200 text-6xl font-medium mb-4"><span class="text-primary">Next</span>Fit</div>
                                <span class="text-muted-color font-medium">Please complet your registration phase</span>
                                <div class="grid md:grid-cols-2 gap-4 my-10">
                                    <app-field [formGroup]="formGoup" [controlName]="'firstName'" type="text" label="First Name"></app-field>
                                    <app-field [formGroup]="formGoup" [controlName]="'lastName'" type="text" label="Last Name"></app-field>
                                    <app-field [formGroup]="formGoup" [controlName]="'birthDate'" type="date" label="Birth Date"></app-field>
                                    <app-field [formGroup]="formGoup" [controlName]="'phone'" type="text" label="Phone number"></app-field>
                                    <app-field [formGroup]="formGoup" [controlName]="'gender'" type="radio" label="Gender" [options]="genderOptions"></app-field>
                                </div>

                                <p-button label="Continue" type="submit" [fluid]="false"></p-button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class RegistrationComplete implements OnInit {
    formGoup!: FormGroup;
    genderOptions = [
        { label: 'Male', value: 'MALE' },
        { label: 'Female', value: 'FEMALE' }
    ];

    constructor() {}
    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.formGoup = new FormGroup({
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            birthDate: new FormControl(null, [Validators.required]),
            phone: new FormControl(null, [Validators.required]),
            gender: new FormControl('', [Validators.required])
        });
    }
}
