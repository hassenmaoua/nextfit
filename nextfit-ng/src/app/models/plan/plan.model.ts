import { InfoSection } from './base/info-section.model';
import { PlanType } from './base/plan-type.model';
import { PlanLevel } from './enums/plan-level.enum';

export class Plan<T extends PlanType> extends InfoSection {
    level!: PlanLevel;
    planConcept!: string;
    weeklySchedules: T[] = [];
}
