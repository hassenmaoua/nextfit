import { InfoSection } from './base/info-section.model';
import { PlanType } from './base/plan-type.model';
import { NutritionGuideline } from './entry/nutrition-guideline.model';
import { WorkoutEntry } from './entry/workout-entry.model';

export class NutritionPlan extends InfoSection implements PlanType {
    workouts: WorkoutEntry[] = [];
    nutrition!: NutritionGuideline;

    displayPlan(): void {
        // Implementation here
    }
}
