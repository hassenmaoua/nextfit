import { InfoSection } from './base/info-section.model';
import { PlanType } from './base/plan-type.model';
import { DietEntry } from './entry/diet-entry.model';

export class MealPlan extends InfoSection implements PlanType {
    diets: DietEntry[] = [];
}
