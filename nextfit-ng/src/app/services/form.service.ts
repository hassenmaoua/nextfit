import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FormFieldConfig, FormSectionConfig } from '../models/form-config.model';
import { PlanLevel } from '../models/plan';
import { personalSectionConfig } from './data';
import { basicConfig } from '../core/basic-form.config';
import { mealConfig } from '../core/meal-form.config';
import { basicPreferencesConfig } from '../core/basic-preferences.config';
import { mealPreferencesConfig } from '../core/meal-preferences.config';

@Injectable({
    providedIn: 'root'
})
export class FormService {
    private isLoading$ = new BehaviorSubject<boolean>(false);
    private currentPhrase$ = new BehaviorSubject<string>('');
    private phrases = [
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

    constructor(private fb: FormBuilder) {}

    // Simulate API call to get form configuration
    getFormConfig(level: string): Observable<FormSectionConfig[]> {
        const basicPlanConfig: FormSectionConfig[] = [personalSectionConfig, ...basicConfig, ...basicPreferencesConfig];

        const meanlPlanConfig: FormSectionConfig[] = [personalSectionConfig, ...mealConfig, ...mealPreferencesConfig];

        const dualConfig: FormSectionConfig[] = [personalSectionConfig, ...basicConfig, ...mealConfig, ...basicPreferencesConfig, ...mealPreferencesConfig];

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
                const validators = this.getValidators(field);
                group[field.fieldName] = [field.defaultValue || null, validators];
            });
        });

        return this.fb.group(group);
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
