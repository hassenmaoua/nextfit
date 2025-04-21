import { FormSectionConfig } from '../models/form-config.model';

export const mealPreferencesConfig: FormSectionConfig[] = [
    {
        id: 'foodTracking',
        label: 'Food Preferences & Restrictions',
        description: 'List foods you avoid, love, or react to. This helps us personalize your plan.',
        size: 6,
        fields: [
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
                fieldName: 'dislikedFoods',
                fieldLabel: 'Foods to Avoid',
                fieldType: 'textarea',
                placeholder: 'E.g. mushrooms, spicy food...',
                required: false
            },
            {
                width: 3,
                fieldName: 'preferredFoods',
                fieldLabel: 'Favorite Ingredients or Meals',
                fieldType: 'textarea',
                placeholder: 'E.g. chicken, sweet potatoes...',
                required: false
            },
            {
                width: 3,
                fieldName: 'excludedCategories',
                fieldLabel: 'Exclude Any of These?',
                fieldType: 'select',
                placeholder: 'Multiple selections allowed',
                options: [
                    { label: 'Dairy', value: 'dairy' },
                    { label: 'Soy', value: 'soy' },
                    { label: 'Gluten', value: 'gluten' },
                    { label: 'Red Meat', value: 'redMeat' },
                    { label: 'Seafood', value: 'seafood' },
                    { label: 'Eggs', value: 'eggs' }
                ],
                required: false
            }
        ]
    }
];
