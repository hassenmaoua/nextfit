import { InfoSection } from '../base/info-section.model';
import { MealEntry } from './meal-entry.model';

export interface DietEntry extends InfoSection {
    day: string;
    meals: MealEntry[];
}
