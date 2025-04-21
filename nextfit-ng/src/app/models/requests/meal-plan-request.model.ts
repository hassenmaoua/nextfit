export interface MealPlanRequest {
    mealGoal: string;
    dietType: string;
    mealFrequency: number;
    calorieTarget: number;
    goalWeight?: number;
    currentActivity: string;
    bodyType: string;
    age: number;
    weight: number;
    height: number;
    gender: 'MALE' | 'FEMALE';
    foodAllergies?: string;
    dislikedFoods?: string;
    preferredFoods?: string;
    excludedCategories?: string;
    breakfastTime?: string;
    lunchTime?: string;
    dinnerTime?: string;
    snackPreference?: boolean;
}
