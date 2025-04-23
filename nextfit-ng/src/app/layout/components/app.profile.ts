import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { UserDTO } from '../../auth/models/user.model';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { FieldComponent } from '../../shared/components/field/field.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormFieldConfig } from '../../models/form-config.model';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MenuModule, BadgeModule, RippleModule, AvatarModule, DialogModule, PasswordModule, FloatLabelModule, ReactiveFormsModule, ButtonModule, FieldComponent, ButtonModule, FieldComponent],
    template: `
        <button type="button" (click)="menu.toggle($event)" class="layout-topbar-action">
            <i class="pi pi-user"></i>
            <span>Profile</span>
        </button>
        <p-menu #menu [model]="items" [popup]="true" class="flex justify-center" styleClass="w-full md:w-60">
            <ng-template #start>
                <div pRipple class="flex flex-column items-center justify-start p-2 pt-4">
                    <p-avatar [label]="(user?.firstName?.slice(0, 1) || 'A').toUpperCase()" styleClass="mr-2" shape="circle" />

                    <span class="inline-flex flex-col">
                        <span class="font-bold">{{ user?.firstName }}</span>
                        <span class="text-sm">{{ user?.email }}</span>
                    </span>
                </div>
            </ng-template>
            <ng-template #submenuheader let-item>
                <span class="text-primary font-bold">{{ item.label }}</span>
            </ng-template>
            <ng-template #item let-item>
                <a pRipple class="flex items-center p-menu-item-link">
                    <span [class]="item.icon"></span>
                    <span class="ml-2">{{ item.label }}</span>
                    <p-badge *ngIf="item.badge" class="ml-auto" [value]="item.badge" />
                    <span *ngIf="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">
                        {{ item.shortcut }}
                    </span>
                </a>
            </ng-template>
        </p-menu>
        <p-dialog header="Change your password" [(visible)]="passwordVisible" [modal]="true" [style]="{ width: '25rem' }">
            <p-floatlabel variant="in">
                <p-password id="currentPswd" formControlName="password" [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false"></p-password>
                <label for="currentPswd" class="font-semibold">Current password</label>
            </p-floatlabel>

            <p-floatlabel variant="in">
                <p-password id="newPswd" formControlName="password" [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false"></p-password>
                <label for="newPswd" class="font-semibold">New password</label>
            </p-floatlabel>

            <p-floatlabel variant="in">
                <p-password id="confNewPswd" formControlName="password" [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false"></p-password>
                <label for="confNewPswd" class="font-semibold">Confirm new password</label>
            </p-floatlabel>

            <ng-template #footer>
                <p-button label="Cancel" severity="primary" [outlined]="true" [text]="true" (click)="passwordVisible = false" />
                <p-button label="Save" severity="primary" (click)="passwordVisible = false" />
            </ng-template>
        </p-dialog>

        <p-dialog header="Update profile" [(visible)]="settingsVisible" [modal]="true" [style]="{ width: 'auto', height: 'auto' }">
            <form [formGroup]="form" (ngSubmit)="submitChange()">
                <div class="grid md:grid-cols-2 gap-4">
                    <ng-container *ngFor="let field of fields">
                        <div [class]="field.width ? 'md:col-span-' + field.width : ''">
                            <app-field
                                [id]="field.fieldName"
                                [formGroup]="form"
                                [controlName]="field.fieldName"
                                [label]="field.fieldLabel"
                                [type]="field.fieldType"
                                [validators]="field.validators"
                                [placeholder]="field.placeholder"
                                [required]="field.required"
                                [options]="field.options || []"
                                [min]="field.min"
                                [max]="field.max"
                                [step]="field.step"
                                [suffix]="field.suffix"
                                [groupAddons]="field.groupAddons"
                            ></app-field>
                        </div>
                    </ng-container>
                </div>

                <div class="flex gap-4 justify-end">
                    <p-button severity="primary" [outlined]="true" type="cancel" label="Cancel" (click)="this.settingsVisible = false" />
                    <p-button severity="primary" type="submit" [loading]="isLoading$ | async" [label]="(isLoading$ | async) ? 'Please wait...' : 'Save'"> </p-button>
                </div>
            </form>
        </p-dialog>
    `
})
export class AppProfile implements OnInit {
    form!: FormGroup;
    isLoading$: Observable<boolean>;
    isLoadingSubject: BehaviorSubject<boolean>;

    items: MenuItem[] | undefined;
    passwordVisible: boolean = false;
    settingsVisible: boolean = false;
    name!: string;
    user: UserDTO | undefined;

    genderOptions = [
        { label: 'Male', value: 'MALE' },
        { label: 'Female', value: 'FEMALE' }
    ];

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.isLoadingSubject = new BehaviorSubject<boolean>(false);
        this.isLoading$ = this.isLoadingSubject.asObservable();
    }

    ngOnInit() {
        this.initForm();
        this.items = [
            {
                separator: true
            },

            {
                label: 'Profile',
                items: [
                    {
                        label: 'Settings',
                        icon: 'pi pi-cog',
                        command: () => {
                            this.showSettingsDialog();
                        }
                    },
                    {
                        label: 'Change Password',
                        icon: 'pi pi-shield',
                        command: () => {
                            this.showPasswordDialog();
                        }
                    },
                    {
                        label: 'Logout',
                        icon: 'pi pi-sign-out',
                        command: () => {
                            this.authService.logout();
                        }
                    }
                ]
            },
            {
                separator: true
            }
        ];
    }

    ngAfterViewInit(): void {
        this.user = this.authService.currentUser;
    }

    initForm() {
        const group: { [key: string]: any } = {};
        this.fields.forEach((field) => {
            const validators = this.getValidators(field);
            group[field.fieldName] = [field.defaultValue || null, validators];
        });

        this.form = this.fb.group(group);
    }

    private getValidators(field: FormFieldConfig): any[] {
        if (!field.validators) return [];

        return field.validators.map((validator) => {
            switch (validator.type) {
                case 'required':
                    return Validators.required;
                case 'min':
                    return Validators.min(validator.value!);
                case 'max':
                    return Validators.max(validator.value!);
                case 'minLength':
                    return Validators.minLength(validator.value!);
                case 'maxLength':
                    return Validators.maxLength(validator.value!);
                case 'pattern':
                    return Validators.pattern(validator.value!);
                case 'email':
                    return Validators.email;
                default:
                    return Validators.nullValidator;
            }
        });
    }

    submitChange() {
        this.isLoadingSubject.next(true);
        const { firstName, lastName, birthDate, phone, gender } = this.form.value;

        // const changePasswordSubscr = this.authService.complet(firstName, lastName, birthDate, phone, gender).subscribe(
        //     (response: any) => {
        //         this.isLoadingSubject.next(false);
        //         this.settingsVisible = false;
        //     },
        //     (error: any) => {
        //         console.error('failed:', error);
        //         this.isLoadingSubject.next(false);
        //     }
        // );
        // this.unsubscribe.push(changePasswordSubscr);
    }

    showPasswordDialog() {
        this.passwordVisible = true;
    }

    showSettingsDialog() {
        this.settingsVisible = true;
    }

    fields: FormFieldConfig[] = [
        {
            width: 1,
            defaultValue: '',
            fieldName: 'firstName',
            fieldLabel: 'First Name',
            fieldType: 'text',
            required: true,

            validators: [{ type: 'required', message: 'First Name is required' }]
        },

        {
            width: 1,
            defaultValue: '',
            fieldName: 'lastName',
            fieldLabel: 'Last Name',
            fieldType: 'text',
            required: true,

            validators: [{ type: 'required', message: 'Last Name is required' }]
        },

        {
            width: 1,
            defaultValue: '',
            fieldName: 'birthDate',
            fieldLabel: 'Date of birth',
            fieldType: 'date',
            required: true,

            validators: [{ type: 'required', message: 'BirthDate is required' }]
        },

        {
            width: 1,
            defaultValue: '',
            fieldName: 'phone',
            fieldLabel: 'Phone Number',
            fieldType: 'text',
            required: true,

            validators: [{ type: 'required', message: 'Phone is required' }]
        },

        {
            width: 2,
            defaultValue: '1-2x/week',
            fieldName: 'currentActivity',
            fieldLabel: 'Current Physical Activity',
            fieldType: 'selectButton',
            required: true,
            options: [
                { label: 'Never', value: 'never' },
                { label: '1-2x/week', value: '1-2x/week' },
                { label: '3-4x/week', value: '3-4x/week' },
                { label: '5+ times/week', value: '5+ times/week' }
            ],
            validators: [{ type: 'required', message: 'Current activity level is required' }]
        },

        {
            width: 1,
            fieldName: 'weight',
            fieldLabel: 'Weight',
            fieldType: 'number',
            defaultValue: 70,
            required: true,
            min: 20,
            max: 150,
            suffix: ' KG',
            validators: [
                { type: 'required', message: 'Weight is required' },
                { type: 'min', value: 20, message: 'Minimum weight is 20kg' },
                { type: 'max', value: 150, message: 'Maximum weight is 150kg' }
            ]
        },
        {
            width: 1,
            fieldName: 'height',
            fieldLabel: 'Height',
            fieldType: 'number',
            defaultValue: 172,
            required: true,
            min: 50,
            max: 200,
            suffix: ' CM',
            validators: [
                { type: 'required', message: 'Height is required' },
                { type: 'min', value: 50, message: 'Minimum height is 50cm' },
                { type: 'max', value: 200, message: 'Maximum height is 200cm' }
            ]
        },
        {
            width: 1,
            fieldName: 'gender',
            fieldLabel: 'Gender',
            fieldType: 'radio',
            defaultValue: 'MALE',
            required: true,
            options: [
                { label: 'Male', value: 'MALE' },
                { label: 'Female', value: 'FEMALE' }
            ],
            validators: [{ type: 'required', message: 'Gender is required' }]
        }
    ];
}
