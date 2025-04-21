import { InfoSection } from './base/info-section.model';
import { PlanType } from './base/plan-type.model';
import { WorkoutEntry } from './entry/workout-entry.model';

export class BasicPlan extends InfoSection implements PlanType {
    workouts: WorkoutEntry[] = [];
}
