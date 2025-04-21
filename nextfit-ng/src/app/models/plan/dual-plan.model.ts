import { InfoSection } from './base/info-section.model';
import { PlanType } from './base/plan-type.model';
import { DietEntry } from './entry/diet-entry.model';
import { WorkoutEntry } from './entry/workout-entry.model';

export class DualPlan extends InfoSection implements PlanType {
    workouts: WorkoutEntry[] = [];
    diets: DietEntry[] = [];
}
