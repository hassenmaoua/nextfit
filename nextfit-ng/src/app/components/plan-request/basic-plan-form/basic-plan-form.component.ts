import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButton } from 'primeng/togglebutton';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { FitnessGoalsSectionComponent } from '../components/fitness-goals-section/fitness-goals-section.component';
import { WorkoutSectionComponent } from '../components/workout-section/workout-section.component';
import { PersonalInfoSectionComponent } from '../components/personal-info-section/personal-info-section.component';
import { Panel } from 'primeng/panel';

@Component({
    selector: 'app-basic-plan-form',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, StepperModule, ButtonModule, InputTextModule, Panel, FitnessGoalsSectionComponent, WorkoutSectionComponent, PersonalInfoSectionComponent, IconField, InputIcon],
    templateUrl: './basic-plan-form.component.html',
    styleUrl: './basic-plan-form.component.scss'
})
export class BasicPlanFormComponent {
    form!: FormGroup;
    activeStep: number = 1;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.initializeForm();
    }

    initializeForm() {
        this.form = this.fb.group({
            // Fitness Goals
            primaryGoal: ['', [Validators.required]],
            targetWeight: [null],
            timelineWeeks: ['', [Validators.required, Validators.min(1), Validators.max(52)]],
            hasGymAccess: [true],
            exerciseFrequency: [null, Validators.required],
            exerciseTypes: ['', Validators.required],
            motivationText: [''],
            // Personal Information
            firstName: [{ value: 'John', disabled: true }, [Validators.required]],
            lastName: [{ value: 'Doe', disabled: true }, Validators.required],
            email: [{ value: 'email@exmaple.com', disabled: true }, [Validators.required, Validators.email]],
            phone: [{ value: '55298403', disabled: true }, [Validators.required, Validators.minLength(8)]],
            // Personal Information
            gender: ['', Validators.required],
            age: [24, [Validators.required, Validators.min(10), Validators.max(90)]],
            weight: [12, [Validators.required, Validators.min(20), Validators.max(999)]],
            height: [12, [Validators.required, Validators.min(50), Validators.max(250)]],
            currentActivity: [23, [Validators.required]],
            // Additional Info
            exercisePreferences: [''],
            exerciseDislikes: [''],
            previousExperience: [''],
            otherConcerns: ['']
        });

        // Conditional validation for medical details
        // this.form.get('hasMedicalConditions')?.valueChanges.subscribe((value) => {
        //     const medicalDetailsControl = this.form.get('medicalDetails');
        //     if (medicalDetailsControl) {
        //         if (value) {
        //             medicalDetailsControl.enable();
        //             medicalDetailsControl.setValidators([Validators.required]);
        //         } else {
        //             medicalDetailsControl.disable();
        //             medicalDetailsControl.clearValidators();
        //             medicalDetailsControl.reset('');
        //         }
        //         medicalDetailsControl.updateValueAndValidity();
        //     }
        // });
    }

    onSubmit() {
        if (this.form.valid) {
            console.log('Basic Plan Submitted', this.form.value);
        }
    }
}
