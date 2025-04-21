/**
 * Represents a complete personalized plan containing multiple periods
 *
 * @example
 * {
 *   title: "12-Week Fitness Transformation",
 *   goal: "Build muscle and improve cardiovascular health",
 *   periods: [
 *     // Period objects...
 *   ]
 * }
 */
export interface Plan {
    /** The name/title of the overall plan */
    title: string;

    /** The primary objective of the entire plan */
    objective: string;

    /** Chronological segments of the plan (typically weeks) */
    periods: Period[];
}

/**
 * A distinct phase of the plan with specific focus (e.g., "Foundation", "Intensity")
 *
 * @example
 * {
 *   title: "Weeks 1-4: Foundation Building",
 *   goal: "Establish baseline strength and endurance",
 *   days: [
 *     // Day objects...
 *   ]
 * }
 */
export interface Period {
    /** Name of this period (usually includes time frame) */
    title: string;

    /** Specific objectives for this segment of the plan */
    goal: string;

    /** Organized days routines within this period */
    days: Day[];
}

/**
 * A recurring routine within a period (e.g., weekly schedule)
 *
 * @example
 * {
 *   title: "Monday/Wednesday/Friday Routine",
 *   parts: [
 *     // Phase objects...
 *   ]
 * }
 */
export interface Day {
    /** Descriptive name of the routine */
    title: string;

    /** The structured components of this routine */
    parts: Part[];
}

/**
 * A component of a schedule with grouped tasks
 *
 * @example
 * {
 *   name: "Strength Training",
 *   tasks: [
 *     // Task objects...
 *   ]
 * }
 */
export interface Part {
    /** Name of this phase (e.g., "Warm-up", "Main Workout") */
    name: string;

    /** Individual actionable items in this phase */
    tasks: Task[];
}

/**
 * A single actionable item with flexible details
 *
 * @example - Workout Task
 * {
 *   name: "Barbell Squats",
 *   description: "Main compound movement for legs",
 *   details: {
 *     sets: "4",
 *     reps: "8-10",
 *     rest: "90s",
 *     videoLink: "https://example.com/squats"
 *   }
 * }
 *
 * @example - Nutrition Task
 * {
 *   name: "Post-Workout Meal",
 *   details: {
 *     mealType: "High-Protein",
 *     calories: "500",
 *     ingredients: ["Chicken", "Rice", "Broccoli"]
 *   }
 * }
 *
 * @example - Recovery Task
 * {
 *   name: "Foam Rolling",
 *   description: "Focus on quadriceps and hamstrings",
 *   details: {
 *     duration: "10 minutes",
 *     focusAreas: "Legs",
 *     notes: "Hold tender spots for 30 seconds"
 *   }
 * }
 */
export interface Task {
    /** Name of the task/exercise/activity */
    name: string;

    /** Optional extended description */
    description?: string;

    /**
     * Flexible key-value pairs for type-specific details
     * - Workout: sets, reps, rest, equipment
     * - Nutrition: mealType, ingredients, macros
     * - Recovery: duration, techniques, focus areas
     */
    details: Record<string, string>;
}

export type WorkoutTask = Task & { details: { sets: number; reps: string } };
export type NutritionTask = Task & { details: { mealType: string; ingredients: string[] } };

// Updated type guards with proper null checks
export function isWorkoutTask(task: Task): boolean {
    return task?.details && typeof task.details === 'object' && ('sets' in task.details || 'reps' in task.details || 'exercise' in task.details);
}

export function isNutritionTask(task: Task): boolean {
    return task?.details && typeof task.details === 'object' && ('mealType' in task.details || 'ingredients' in task.details || 'calories' in task.details);
}

export function isTimedTask(task: Task): boolean {
    return task?.details && typeof task.details === 'object' && ('duration' in task.details || 'time' in task.details);
}

export const advancedPlan: Plan = {
    title: '12-Week Performance Program',
    objective: 'Improve fitness with structured training and nutrition',
    periods: [
        {
            title: 'Weeks 1-4: Foundation',
            goal: 'Build basic strength and establish habits',
            days: [
                {
                    title: 'Strength Training',
                    parts: [
                        {
                            name: 'Warm-up',
                            tasks: [
                                {
                                    name: 'Dynamic Mobility',
                                    details: {
                                        duration: '15 min',
                                        exercises: 'Leg swings, Arm circles, Hip openers',
                                        intensity: 'Moderate'
                                    }
                                }
                            ]
                        },
                        {
                            name: 'Main Workout',
                            tasks: [
                                {
                                    name: 'Barbell Squats',
                                    details: {
                                        sets: '4',
                                        reps: '8-10',
                                        rest: '90s',
                                        load: 'Moderate',
                                        equipment: 'Barbell, Squat rack'
                                    }
                                },
                                {
                                    name: 'Push-ups',
                                    details: {
                                        sets: '3',
                                        reps: '12-15',
                                        variation: 'Incline if needed'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Nutrition Guide',
                    parts: [
                        {
                            name: 'Meal Planning',
                            tasks: [
                                {
                                    name: 'Pre-Workout Meal',
                                    details: {
                                        timing: '1-2 hours before',
                                        meal: 'Oatmeal + Banana',
                                        calories: '300-400'
                                    }
                                },
                                {
                                    name: 'Post-Workout Meal',
                                    details: {
                                        timing: 'Within 30min after',
                                        meal: 'Chicken + Rice + Vegetables',
                                        protein: '40g'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            title: 'Weeks 5-8: Progression',
            goal: 'Increase intensity and refine technique',
            days: [
                {
                    title: 'Advanced Training',
                    parts: [
                        {
                            name: 'Strength Focus',
                            tasks: [
                                {
                                    name: 'Deadlifts',
                                    details: {
                                        sets: '5',
                                        reps: '5',
                                        load: 'Heavy',
                                        cue: 'Keep back straight'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Supplementation',
                    parts: [
                        {
                            name: 'Timing',
                            tasks: [
                                {
                                    name: 'Intra-Workout',
                                    details: {
                                        supplement: 'Electrolytes',
                                        amount: '500ml water',
                                        purpose: 'Hydration'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

export interface PlanRequest {
    // Fitness Goals
    primaryGoal: 'lose Weight' | 'gain Muscle' | 'improve strength' | 'enhance endurance' | 'general fitness';
    targetWeight?: number;
    timelineWeeks: number;
    hasGymAccess: boolean;
    exerciseTypes: string[];
    exerciseFrequency: '1 time/week' | '1-2x/week' | '3-4x/week' | '5+ times/week';
    motivation?: string;

    // Personal Information
    gender: 'male' | 'female';
    age: number;
    weight: number;
    height: number;
    currentActivity: 'never' | '1-2x/week' | '3-4x/week' | '5+ times/week';

    // Health & Medical Background
    hasMedicalConditions?: boolean;
    medicalDetails?: string;
    injuries?: string;
    medications?: string[];
    allergies?: string[];
    smokes: boolean;
    alcoholConsumption?: 'none' | 'occasional' | 'frequent';

    // Nutrition
    tracksFood: boolean;
    mealsPerDay: number;
    dietaryRestrictions?: string[];
    waterIntake: number;

    // Sleep & Recovery
    sleepHours: number;
    stressLevel: number;
    recoveryHabits?: string[];

    // Additional Info (free wirting)
    exercisePreferences?: string;
    exerciseDislikes?: string;
    previousExperience?: string;
    otherConcerns?: string;
}
