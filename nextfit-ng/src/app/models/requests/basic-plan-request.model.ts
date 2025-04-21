export type PrimaryGoalType = 'lose weight' | 'gain muscle' | 'improve strength' | 'enhance endurance' | 'general fitness';

export interface BasicPlanRequest {
    primaryGoal: PrimaryGoalType;
    targetWeight: number;
    targetTimeline: number;
    hasGymAccess: boolean;
    exerciseTypes: string[];
    exerciseFrequency: string;
    motivationText?: string;
    age: number;
    weight: number;
    height: number;
    gender: 'MALE' | 'FEMALE';
    currentActivity: string;
    exercisePreferences?: string;
    exerciseDislikes?: string;
    previousExperience?: string;
    otherConcerns?: string;
}
