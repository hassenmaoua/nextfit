import { InfoSection } from '../base/info-section.model';
import { ExerciseEntry } from './exercise-entry.model';

export interface WorkoutEntry extends InfoSection {
    day: string;
    exercises: ExerciseEntry[];
}
