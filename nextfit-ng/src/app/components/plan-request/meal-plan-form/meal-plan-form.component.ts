import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButton } from 'primeng/togglebutton';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { CommonModule } from '@angular/common';
import { PersonalInfoSectionComponent } from '../components/personal-info-section/personal-info-section.component';
import { MealPlanSectionComponent } from '../components/meal-plan-section/meal-plan-section.component';
import { NutritionGuidanceSectionComponent } from '../components/nutrition-guidance-section/nutrition-guidance-section.component';

@Component({
    selector: 'app-meal-plan-form',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MealPlanSectionComponent, PersonalInfoSectionComponent, NutritionGuidanceSectionComponent, StepperModule, ButtonModule, InputTextModule],
    templateUrl: './meal-plan-form.component.html',
    styleUrl: './meal-plan-form.component.scss'
})
export class MealPlanFormComponent {
    form!: FormGroup;
    activeStep: any;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            meals: this.fb.array([])
        });
    }

    get meals(): FormArray {
        return this.form.get('meals') as FormArray;
    }

    addMeal() {
        this.meals.push(
            this.fb.group({
                day: [''],
                time: [''],
                mealType: [''],
                mealDescription: ['']
            })
        );
    }

    onSubmit() {
        console.log('Meal Plan Submitted', this.form.value);
    }
}
