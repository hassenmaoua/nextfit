import { PlanType } from '../plan/base/plan-type.model';
import { BasicPlan } from '../plan/basic-plan.model';
import { PlanLevel } from '../plan/enums/plan-level.enum';
import { MealPlan } from '../plan/meal-plan.model';
import { NutritionPlan } from '../plan/nutrition-plan.model';
import { PremiumPlan } from '../plan/premium-plan.model';

export class PlanFactory {
    static createPlan(level: PlanLevel, data: any): PlanType {
        switch (level) {
            case PlanLevel.BASIC:
                return Object.assign(new BasicPlan(), data);
            case PlanLevel.MEAL:
                return Object.assign(new MealPlan(), data);
            case PlanLevel.NUTRITION:
                return Object.assign(new NutritionPlan(), data);
            case PlanLevel.PREMIUM:
                return Object.assign(new PremiumPlan(), data);
            default:
                throw new Error(`Unsupported plan level: ${level}`);
        }
    }
}
