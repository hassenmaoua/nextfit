import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FormSectionConfig } from '../models/form-builder/form-config.model';
import { PlanLevel } from '../models/plan';
import { personalSectionConfig } from './data';
import { basicConfig } from '../core/basic-form.config';
import { mealConfig } from '../core/meal-form.config';
import { FieldService } from './field.service';
import { AuthService } from '../auth/services/auth.service';
import { UserDTO } from '../auth/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class FormService {
    private readonly isLoading$ = new BehaviorSubject<boolean>(false);
    private readonly currentPhrase$ = new BehaviorSubject<string>('');
    private readonly phrases = [
        'Analyzing your fitness profile',
        'Designing personalized exercises',
        'Optimizing workout intensity',
        'Balancing muscle groups',
        'Calculating optimal rest periods',
        'Generating exercise variations',
        'Finalizing your workout plan',
        'Adding expert training tips',
        'Reviewing exercise safety',
        'Customizing for your equipment',
        'Almost done crafting your plan',
        'One final quality check',
        'Thank you for your patience'
    ];
    private intervalId: any;
    private index = 0;

    constructor(
        private readonly fb: FormBuilder,
        private readonly fieldService: FieldService,
        private readonly authService: AuthService
    ) {}

    isUserKey(key: string, user: UserDTO): key is keyof UserDTO {
        return key in (user || {});
    }

    // Simulate API call to get form configuration
    getFormConfig(level: string): Observable<FormSectionConfig[]> {
        const currentUser = this.authService.currentUser;
        personalSectionConfig.fields.forEach((field) => {
            if (currentUser && this.isUserKey(field.fieldName, currentUser)) {
                field.defaultValue = currentUser[field.fieldName];
            }
        });

        const personalConfig = {};

        const basicPlanConfig: FormSectionConfig[] = [personalSectionConfig, ...basicConfig];

        const meanlPlanConfig: FormSectionConfig[] = [personalSectionConfig, ...mealConfig];

        const dualConfig: FormSectionConfig[] = [personalSectionConfig, ...basicConfig, ...mealConfig];

        const nutritionConfig: FormSectionConfig[] = [personalSectionConfig];

        const premiumConfig: FormSectionConfig[] = [personalSectionConfig];

        switch (level) {
            case PlanLevel.BASIC:
                return of(basicPlanConfig);
            case PlanLevel.MEAL:
                return of(meanlPlanConfig);
            case PlanLevel.DUAL:
                return of(dualConfig);
            case PlanLevel.NUTRITION:
                return of(nutritionConfig);
            case PlanLevel.PREMIUM:
                return of(premiumConfig);
            default:
                return of([]);
        }
    }

    createFormGroup(steps: FormSectionConfig[]): FormGroup {
        const group: { [key: string]: any } = {};

        steps.forEach((step) => {
            step.fields.forEach((field) => {
                const validators = this.fieldService.getValidators(field);
                group[field.fieldName] = [field.defaultValue ?? null, validators];
            });
        });

        return this.fb.group(group);
    }

    getLoadingStatus(): Observable<boolean> {
        return this.isLoading$.asObservable();
    }
    getCurrentPhrase(): Observable<string> {
        return this.currentPhrase$.asObservable();
    }

    startLoading(): void {
        this.isLoading$.next(true);
        this.index = 0;
        this.currentPhrase$.next(this.phrases[this.index]);
        this.scheduleNext();
    }

    stopLoading(): void {
        this.isLoading$.next(false);
        clearTimeout(this.intervalId);
        this.index = 0;
    }

    private scheduleNext(): void {
        const delay = 12000 + Math.random() * 18000;

        this.intervalId = setTimeout(() => {
            if (this.isLoading$.value) {
                this.index = (this.index + 1) % this.phrases.length;
                this.currentPhrase$.next(this.phrases[this.index]);
                this.scheduleNext();
            }
        }, delay);
    }
}
