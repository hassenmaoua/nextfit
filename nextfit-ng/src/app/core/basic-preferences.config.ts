import { FormSectionConfig } from '../models/form-config.model';

export const basicPreferencesConfig: FormSectionConfig[] = [
    {
        id: 'additionalInformation',
        label: 'Additional Information',
        description: 'Tell us more about your preferences and experience.',
        size: 6,
        fields: [
            {
                width: 3,
                fieldName: 'exercisePreferences',
                fieldLabel: 'Exercise Preferences',
                fieldType: 'textarea',
                placeholder: 'What exercises do you enjoy?',
                required: false
            },
            {
                width: 3,
                fieldName: 'exerciseDislikes',
                fieldLabel: 'Exercise Dislikes',
                fieldType: 'textarea',
                placeholder: 'What exercises do you avoid?',
                required: false
            },
            {
                width: 3,
                fieldName: 'previousExperience',
                fieldLabel: 'Previous Fitness Experience',
                fieldType: 'textarea',
                placeholder: 'Describe your fitness background',
                required: false
            },
            {
                width: 3,
                fieldName: 'otherConcerns',
                fieldLabel: 'Other Concerns/Comments',
                fieldType: 'textarea',
                required: false
            }
        ]
    }
];
