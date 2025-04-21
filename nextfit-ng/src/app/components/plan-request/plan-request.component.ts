import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputGroupModule } from 'primeng/inputgroup';
import { FluidModule } from 'primeng/fluid';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputNumberModule } from 'primeng/inputnumber';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { ColorPickerModule } from 'primeng/colorpicker';
import { KnobModule } from 'primeng/knob';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TreeSelectModule } from 'primeng/treeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { ListboxModule } from 'primeng/listbox';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TextareaModule } from 'primeng/textarea';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputMaskModule } from 'primeng/inputmask';
import { TooltipModule } from 'primeng/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { Observable } from 'rxjs';
import { PlanService } from '../../plan/plan.service';
import { LoadingService } from '../../shared/services/loading.service';
import { PlanRequest } from '../../plan/models/plan.model';

@Component({
    selector: 'app-plan-request',
    templateUrl: './plan-request.component.html',
    styleUrl: './plan-request.component.scss',
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        CheckboxModule,
        RadioButtonModule,
        SelectButtonModule,
        InputGroupModule,
        FluidModule,
        IconFieldModule,
        InputIconModule,
        FloatLabelModule,
        AutoCompleteModule,
        InputNumberModule,
        SliderModule,
        RatingModule,
        ColorPickerModule,
        KnobModule,
        SelectModule,
        DatePickerModule,
        ToggleButtonModule,
        ToggleSwitchModule,
        TreeSelectModule,
        MultiSelectModule,
        ListboxModule,
        InputGroupAddonModule,
        TextareaModule,
        InputMaskModule,
        TooltipModule,
        ReactiveFormsModule,
        ConfirmDialog,
        ButtonModule,
        ToastModule,
        PanelModule,
        MenuModule
    ],
    providers: [ConfirmationService, MessageService]
})
export class PlanRequestComponent implements OnInit {
    @ViewChildren('primaryGoal, targetWeight, timelineWeeks, exerciseTypes')
    items: { label?: string; icon?: string; separator?: boolean }[] = [];
    form!: FormGroup;
    isLoading$: Observable<boolean> | undefined;

    // main types
    // exerciseTypes = ['Weight Training', 'Cardio', 'Yoga', 'Pilates', 'Calisthenics', 'Swimming'];

    dietaryRestrictions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Paleo'];

    // Options for select controls
    alcoholOptions = [
        { label: 'None', value: 'None' },
        { label: 'Occasional', value: 'Occasional' },
        { label: 'Frequent', value: 'Frequent' }
    ];

    goalOptions = [
        { label: 'Lose Weight', value: 'lose Weight' },
        { label: 'Gain Muscle', value: 'gain Muscle' },
        { label: 'Improve Strength', value: 'improve strength' },
        { label: 'Enhance Endurance', value: 'enhance endurance' },
        { label: 'General Fitness', value: 'general fitness' }
    ];

    currentFrequencyOptions = [
        { label: 'Never', value: 'Never' },
        { label: '1-2x/week', value: '1-2x/week' },
        { label: '3-4x/week', value: '3-4x/week' },
        { label: '5+ times/week', value: '5+ times/week' }
    ];

    frequencyOptions = [
        { label: '1 time/week', value: '1 time/week' },
        { label: '1-2x/week', value: '1-2x/week' },
        { label: '3-4x/week', value: '3-4x/week' },
        { label: '5+ times/week', value: '5+ times/week' }
    ];

    timeOptions = [
        { label: 'Morning', value: 'morning' },
        { label: 'Afternoon', value: 'afternoon' },
        { label: 'Evening', value: 'evening' }
    ];

    dietOptions = [
        { label: 'None', value: 'none' },
        { label: 'Vegetarian', value: 'vegetarian' },
        { label: 'Vegan', value: 'vegan' },
        { label: 'Gluten-Free', value: 'gluten-free' }
    ];

    // Autocomplete suggestions
    medicationSuggestions: string[] = [];
    allergySuggestions: string[] = [];
    exerciseSuggestions: string[] = [];
    recoverySuggestions: string[] = [];

    constructor(
        private fb: FormBuilder,
        private planService: PlanService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private loadingService: LoadingService,
        private router: Router
    ) {}

    ngOnInit() {
        this.initializeForm();
        this.initializeSuggestions();
        this.isLoading$ = this.loadingService.getLoadingStatus();
        this.items = [
            {
                label: 'Refresh',
                icon: 'pi pi-refresh'
            },
            {
                label: 'Search',
                icon: 'pi pi-search'
            },
            {
                separator: true
            },
            {
                label: 'Delete',
                icon: 'pi pi-times'
            }
        ];
    }

    initializeForm() {
        this.form = this.fb.group({
            // Fitness Goals
            primaryGoal: [defaultValues.primaryGoal, [Validators.required]],
            targetWeight: [null],
            timelineWeeks: [defaultValues.timelineWeeks, [Validators.required, Validators.min(1), Validators.max(52)]],
            hasGymAccess: [true],
            exerciseFrequency: [null, Validators.required],
            exerciseTypes: [defaultValues.exerciseTypes, Validators.required],
            motivationText: [''],

            // Personal Information
            firstName: [{ value: 'John', disabled: true }, [Validators.required]],
            lastName: [{ value: 'Doe', disabled: true }, Validators.required],
            email: [{ value: 'email@exmaple.com', disabled: true }, [Validators.required, Validators.email]],
            phone: [{ value: '55298403', disabled: true }, [Validators.required, Validators.minLength(8)]],

            // Personal Information
            gender: [defaultValues.gender, Validators.required],
            age: [defaultValues.age, [Validators.required, Validators.min(10), Validators.max(90)]],
            weight: [defaultValues.weight, [Validators.required, Validators.min(20), Validators.max(999)]],
            height: [defaultValues.height, [Validators.required, Validators.min(50), Validators.max(250)]],
            currentActivity: [defaultValues.currentActivity, [Validators.required]],

            // Health Information
            hasMedicalConditions: [false],
            medicalDetails: [{ value: '', disabled: true }],
            medications: [defaultValues.medications, Validators.required],
            injuries: [''],
            allergies: [defaultValues.allergies, Validators.required],
            smokes: [false],
            alcoholConsumption: ['None'],

            // Nutrition
            mealsPerDay: [defaultValues.mealsPerDay, [Validators.required, Validators.min(1), Validators.max(10)]],
            tracksFood: [false],
            dietaryRestrictions: [[]],
            waterIntake: [defaultValues.waterIntake, [Validators.required, Validators.min(0), Validators.max(10)]],

            // Sleep & Recovery
            sleepHours: [defaultValues.sleepHours, [Validators.required, Validators.min(0), Validators.max(12)]],
            stressLevel: [defaultValues.stressLevel],
            recoveryHabits: [[]],

            // Additional Info
            exercisePreferences: [''],
            exerciseDislikes: [''],
            previousExperience: [''],
            otherConcerns: ['']
        });

        // Conditional validation for medical details
        this.form.get('hasMedicalConditions')?.valueChanges.subscribe((value) => {
            const medicalDetailsControl = this.form.get('medicalDetails');
            if (medicalDetailsControl) {
                if (value) {
                    medicalDetailsControl.enable();
                    medicalDetailsControl.setValidators([Validators.required]);
                } else {
                    medicalDetailsControl.disable();
                    medicalDetailsControl.clearValidators();
                    medicalDetailsControl.reset('');
                }
                medicalDetailsControl.updateValueAndValidity();
            }
        });
    }

    initializeSuggestions() {
        // Initialize with common values for autocomplete
        this.medicationSuggestions = ['None', 'Blood Pressure Medication', 'Insulin', 'Antidepressants'];
        this.allergySuggestions = ['None', 'Peanuts', 'Dairy', 'Gluten', 'Shellfish'];
        this.exerciseSuggestions = ['Running', 'Weightlifting', 'Yoga', 'Swimming', 'Cycling'];
        this.recoverySuggestions = ['Stretching', 'Foam Rolling', 'Ice Bath', 'Massage'];
    }

    // Search functions for autocomplete
    searchMedications(event: any) {
        const query = event.query.toLowerCase();
        this.medicationSuggestions = ['None', 'Blood Pressure Medication', 'Insulin', 'Antidepressants'].filter((med) => med.toLowerCase().includes(query));
    }

    searchAllergies(event: any) {
        const query = event.query.toLowerCase();
        this.allergySuggestions = ['None', 'Peanuts', 'Dairy', 'Gluten', 'Shellfish'].filter((allergy) => allergy.toLowerCase().includes(query));
    }

    searchExercises(event: any) {
        const query = event.query.toLowerCase();
        this.exerciseSuggestions = ['Running', 'Weightlifting', 'Yoga', 'Swimming', 'Cycling'].filter((ex) => ex.toLowerCase().includes(query));
    }

    searchRecoveryHabits(event: any) {
        const query = event.query.toLowerCase();
        this.recoverySuggestions = ['Stretching', 'Foam Rolling', 'Ice Bath', 'Massage'].filter((habit) => habit.toLowerCase().includes(query));
    }

    // Convenience getter for easy access to form fields
    get f() {
        return this.form.controls;
    }

    onSubmit() {
        if (this.form.invalid) {
            this.markAllAsTouched();
            this.focusFirstInvalidField();
            return;
        }
        const formData: PlanRequest = this.form.value;

        this.confirmationService.confirm({
            header: 'Are you sure?',
            message: 'Please confirm to proceed.',
            accept: () => {
                this.loadingService.startLoading();
                this.planService.generateAIPlan(formData).subscribe({
                    next: (plan) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Plan Generated',
                            detail: 'Your personalized plan is ready!',
                            life: 5000
                        });
                        this.loadingService.stopLoading();
                        // Navigate after showing the success message
                        setTimeout(() => {
                            this.router.navigate(['/plans/' + plan.id], {
                                state: { newPlan: true } // Optional: pass state to show welcome message
                            });
                        }, 1500); // Short delay to let user see the success message
                    },
                    error: (err) => {
                        console.log(err);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: err?.error.error || 'Failed to generate plan. Please try again.',
                            life: 5000
                        });
                        this.loadingService.stopLoading();
                    }
                });
            },
            reject: () => {
                // this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected' });
            }
        });
    }

    private focusFirstInvalidField() {
        const firstInvalidControl = Object.keys(this.form.controls).find((key) => this.form.get(key)?.errors);

        if (firstInvalidControl) {
            const element = document.querySelector(`[formControlName="${firstInvalidControl}"]`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                (element as HTMLElement).focus();
            }
        }
    }

    private markAllAsTouched(): void {
        Object.values(this.form.controls).forEach((control) => {
            control.markAsTouched();
        });
    }

    onCancel() {
        if (this.form.dirty) {
            // Confirm before discarding changes
            if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
                this.resetForm();
            }
        } else {
            this.resetForm();
        }
    }

    resetForm() {
        this.form.reset();
        // Reset to default values
        this.initializeForm();
    }

    onSliderChange(controlName: string) {
        const control = this.form.get(controlName);
        if (control) {
            // Trigger change detection for the slider
            control.setValue(control.value, { emitEvent: true });
        }
    }

    onNumberInputChange(controlName: string) {
        const control = this.form.get(controlName);
        if (control) {
            // Trigger change detection for the input number
            control.setValue(control.value, { emitEvent: true });
        }
    }
}

const defaultValues: PlanRequest = {
    primaryGoal: 'lose Weight',
    gender: 'male',
    age: 24,
    weight: 64,
    height: 162,
    smokes: true,
    timelineWeeks: 5,
    exerciseFrequency: '1-2x/week',
    hasGymAccess: false,
    exerciseTypes: [],
    medications: ['None'],
    allergies: ['None'],
    currentActivity: 'never',
    mealsPerDay: 3,
    tracksFood: false,
    waterIntake: 0,
    sleepHours: 0,
    stressLevel: 0
};
