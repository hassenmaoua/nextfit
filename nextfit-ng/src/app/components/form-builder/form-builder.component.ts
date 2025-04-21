import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormFieldConfig, FormSectionConfig } from '../../models/form-config.model';
import { FormService } from '../../services/form.service';
import imports from './imports';
import { firstValueFrom, Observable } from 'rxjs';
import { FieldComponent } from '../../shared/components/field/field.component';
import { PlanLevel } from '../../models/plan';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../shared/services/loading.service';
import { PlanService } from '../../services/plan.service';
import { BasicPlanRequest, MealPlanRequest } from '../../models/requests';
import { buttons } from '../../pages/home/home.component';
import { MenuService } from '../../layout/service/menu.service';
import { PlanDTO } from '../../models/dto';

@Component({
    selector: 'app-form-builder',
    imports: [imports, FieldComponent],
    templateUrl: './form-builder.component.html',
    styleUrls: ['./form-builder.component.scss'],
    providers: [ConfirmationService, MessageService]
})
export class FormBuilderComponent implements OnInit {
    planLevel: 'BASIC' | 'MEAL' | 'DUAL' | 'NUTRITION' | 'PREMIUM' = PlanLevel.BASIC;

    config: FormSectionConfig[] = [];
    form!: FormGroup;
    loading = true;
    pageTitle = 'Plan Generator'; // default title
    options: any;

    isLoading$: Observable<boolean> | undefined;

    constructor(
        private formService: FormService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private planService: PlanService,
        private router: Router,
        private route: ActivatedRoute,
        private menuSerivce: MenuService
    ) {}

    ngOnInit() {
        this.options = ['BASIC', 'MEAL', 'DUAL', 'NUTRITION', 'PREMIUM'];

        // Validate the query parameter
        this.route.queryParams.subscribe((params) => {
            const planParam = params['plan'] || PlanLevel.BASIC;

            if (planParam) {
                // Check if the param is a valid PlanLevel value
                const isValidPlan = Object.values(PlanLevel).includes(planParam);

                if (isValidPlan) {
                    this.planLevel = planParam as PlanLevel;
                    this.pageTitle = this.getPageTitle(planParam);
                } else {
                    // Redirect to error page if invalid
                    this.router.navigate(['/notfound']);
                    return; // Stop further execution
                }
            }

            this.loadFormConfig(); // Proceed if valid or no param
        });
    }

    async loadFormConfig(): Promise<void> {
        this.loading = true;
        try {
            const config = await firstValueFrom(this.formService.getFormConfig(this.planLevel));
            this.config = config;
            this.form = this.formService.createFormGroup(this.config);
        } catch (err) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to load form configuration'
            });
        } finally {
            this.loading = false;
        }
    }

    get f() {
        return this.form.controls;
    }

    onSubmit(): void {
        if (this.form.invalid) {
            this.markFormGroupTouched(this.form);
            this.focusFirstInvalidField();
            return;
        }

        this.confirmationService.confirm({
            header: 'Are you sure?',
            message: 'Please confirm to proceed.',
            accept: () => {
                this.formService.startLoading();
                this.generatePlan(this.planLevel, this.form.value);
            }
        });
    }

    private generatePlan(plan: string, formData: any) {
        const planGenerators: Record<string, (data: any) => Observable<any>> = {
            [PlanLevel.BASIC]: this.planService.generateBasicPlan.bind(this.planService),
            [PlanLevel.MEAL]: this.planService.generateMealPlan.bind(this.planService),
            [PlanLevel.DUAL]: this.planService.generateDualPlan.bind(this.planService)
            // Add other plan levels as needed
        };

        const planFn = planGenerators[plan];
        if (!planFn) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Unsupported Plan',
                detail: 'Selected plan type is not supported.',
                life: 5000
            });
            this.formService.stopLoading();
            return;
        }

        planFn(formData).subscribe({
            next: (plan: PlanDTO) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Plan Generated',
                    detail: 'Your personalized plan is ready!',
                    life: 5000
                });
                this.menuSerivce.putPlan = plan;
                this.formService.stopLoading();
                setTimeout(() => {
                    this.router.navigate(['/plans/' + plan.id], {
                        state: { newPlan: true } // Optional: pass state to show welcome message
                    });
                }, 1500);
            },
            error: (err) => {
                console.error(err);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: err?.error?.error || 'Failed to generate plan. Please try again.',
                    life: 5000
                });
                this.formService.stopLoading();
            }
        });
    }

    private markFormGroupTouched(formGroup: FormGroup): void {
        Object.values(formGroup.controls).forEach((control) => {
            control.markAsTouched();

            if (control instanceof FormGroup) {
                this.markFormGroupTouched(control);
            }
        });
    }

    private focusFirstInvalidField() {
        const firstInvalidControl = Object.keys(this.form.controls).find((key) => this.form.get(key)?.errors);

        if (firstInvalidControl) {
            const element = document.querySelector(`[id="${firstInvalidControl}"]`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                (element as HTMLElement).focus();
            }
        }
    }

    private getStepFormGroup(stepIndex: number): FormGroup {
        const stepId = this.config[stepIndex]?.id;
        return this.form?.get(stepId) as FormGroup;
    }

    isFieldVisible(field: FormFieldConfig): boolean {
        if (!this.form || !this.form.controls[field.fieldName]) {
            return false;
        }
        return true;
    }

    confirm() {
        this.confirmationService.confirm({
            header: 'Are you sure?',
            message: 'Please confirm to proceed.',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
            },
            reject: () => {
                this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected' });
            }
        });
    }

    private getPageTitle(planParam: string): string {
        const matchedButton = buttons.find((button) => button.queryParams.plan == planParam);
        return matchedButton?.title ?? 'Plan Generator';
    }
}
