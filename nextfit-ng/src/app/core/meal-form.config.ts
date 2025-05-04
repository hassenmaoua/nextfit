import { FormSectionConfig } from '../models/form-builder/form-config.model';

export const mealConfig: FormSectionConfig[] = [
    {
        id: 'mealGoals',
        label: 'Meal Preferences & Goals',
        description: 'Customize your meal plan based on your specific dietary goals and habits.',
        size: 6,
        fields: [
            {
                width: 6,
                fieldName: 'mealGoal',
                fieldLabel: 'What is your primary dietary goal?',
                fieldType: 'selectButton',
                defaultValue: 'fat loss',
                required: true,
                options: [
                    { label: 'Fat Loss', value: 'fat loss' },
                    { label: 'Muscle Gain', value: 'muscle gain' },
                    { label: 'Maintenance', value: 'maintenance' },
                    { label: 'Recomposition', value: 'recomposition' },
                    { label: 'Improve Energy', value: 'improve energy' }
                ],
                validators: [{ type: 'required', message: 'Selecting a goal is required' }]
            },
            {
                width: 3,
                fieldName: 'dietType',
                fieldLabel: 'Preferred Diet Style',
                fieldType: 'select',
                placeholder: 'Choose a style',
                options: [
                    { label: 'Balanced', value: 'balanced' },
                    { label: 'Keto', value: 'keto' },
                    { label: 'Vegan', value: 'vegan' },
                    { label: 'Vegetarian', value: 'vegetarian' },
                    { label: 'Paleo', value: 'paleo' },
                    { label: 'Mediterranean', value: 'mediterranean' },
                    { label: 'High Protein', value: 'highProtein' }
                ],
                required: true,
                validators: [{ type: 'required', message: 'Diet style is required' }]
            },
            {
                width: 3,
                fieldName: 'mealFrequency',
                fieldLabel: 'Meals Per Day',
                fieldType: 'selectButton',
                defaultValue: 3,
                options: [
                    { label: '2 Meals', value: 2 },
                    { label: '3 Meals', value: 3 },
                    { label: '4 Meals', value: 4 },
                    { label: '5 Meals', value: 5 },
                    { label: '6+ Meals', value: 6 }
                ],
                required: true,
                validators: [{ type: 'required', message: 'Meal frequency is required' }]
            },
            {
                width: 2,
                fieldName: 'calorieTarget',
                fieldLabel: 'Daily Calorie Goal',
                fieldType: 'number',
                suffix: ' kcal',
                step: 100,
                min: 1000,
                max: 5000,
                defaultValue: 2200,
                required: true,
                validators: [
                    { type: 'required', message: 'Calorie target is required' },
                    { type: 'min', value: 1000, message: 'Minimum is 1000 kcal' },
                    { type: 'max', value: 5000, message: 'Maximum is 5000 kcal' }
                ]
            },
            {
                width: 2,
                fieldName: 'bodyType',
                fieldLabel: 'Body Type',
                fieldType: 'select',
                defaultValue: 'mesomorph',
                options: [
                    { label: 'Ectomorph (slim, fast metabolism)', value: 'ectomorph' },
                    { label: 'Mesomorph (muscular, balanced)', value: 'mesomorph' },
                    { label: 'Endomorph (stockier, slower metabolism)', value: 'endomorph' }
                ],
                required: true,
                validators: [{ type: 'required', message: 'Please select body type' }]
            },
            {
                width: 2,
                defaultValue: 75,
                fieldName: 'targetWeight',
                fieldLabel: 'Target Weight',
                fieldType: 'number',
                required: false,
                min: 30,
                max: 200,
                suffix: ' KG',
                validators: [
                    { type: 'min', value: 30, message: 'Minimum weight is 30' },
                    { type: 'max', value: 200, message: 'Maximum weight is 200' }
                ]
            },
            {
                width: 3,
                fieldName: 'foodAllergies',
                fieldLabel: 'Allergies',
                fieldType: 'textarea',
                placeholder: 'E.g. peanuts, shellfish, gluten...',
                required: false
            },
            {
                width: 3,
                fieldName: 'preferredFoods',
                fieldLabel: 'Favorite Ingredients or Meals',
                fieldType: 'textarea',
                placeholder: 'E.g. chicken, sweet potatoes...',
                required: false
            }
        ]
    }
    // {
    //     id: 'mealTiming',
    //     label: 'Mealtime Preferences',
    //     description: 'Tell us when and how you prefer to eat.',
    //     size: 6,
    //     fields: [
    //         {
    //             width: 3,
    //             fieldName: 'breakfastTime',
    //             fieldLabel: 'Preferred Breakfast Time',
    //             fieldType: 'time',
    //             placeholder: 'e.g. 08:00 AM',
    //             required: false
    //         },
    //         {
    //             width: 3,
    //             fieldName: 'lunchTime',
    //             fieldLabel: 'Preferred Lunch Time',
    //             fieldType: 'time',
    //             placeholder: 'e.g. 01:00 PM',
    //             required: false
    //         },
    //         {
    //             width: 3,
    //             fieldName: 'dinnerTime',
    //             fieldLabel: 'Preferred Dinner Time',
    //             fieldType: 'time',
    //             placeholder: 'e.g. 07:00 PM',
    //             required: false
    //         },
    //         {
    //             width: 3,
    //             fieldName: 'snackPreference',
    //             fieldLabel: 'Do you like snacks?',
    //             fieldType: 'radio',
    //             defaultValue: true,
    //             options: [
    //                 { label: 'Yes', value: true },
    //                 { label: 'No', value: false }
    //             ],
    //             required: true,
    //             validators: [{ type: 'required', message: 'Please choose an option' }]
    //         }
    //     ]
    // }
];
