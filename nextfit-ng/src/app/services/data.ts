import { FormSectionConfig } from '../models/form-config.model';

export const personalSectionConfig: FormSectionConfig = {
    id: 'personalInformation',
    label: 'Personal Information',
    description: 'Enter basic info for a personalized plan.',
    size: 4,
    fields: [
        {
            width: 2,
            defaultValue: '1-2x/week',
            fieldName: 'currentActivity',
            fieldLabel: 'Current Physical Activity',
            fieldType: 'selectButton',
            required: true,
            options: [
                { label: 'Never', value: 'never' },
                { label: '1-2x/week', value: '1-2x/week' },
                { label: '3-4x/week', value: '3-4x/week' },
                { label: '5+ times/week', value: '5+ times/week' }
            ],
            validators: [{ type: 'required', message: 'Current activity level is required' }]
        },
        {
            width: 2,
            defaultValue: 'beginner',
            fieldName: 'currentLevel',
            fieldLabel: 'Level of experience',
            fieldType: 'selectButton',
            required: true,
            options: [
                { label: 'Beginner', value: 'beginner' },
                { label: 'Intermediate', value: 'intermediate' },
                { label: 'Advanced', value: 'advanced' },
                { label: 'Expert', value: 'expert' }
            ],
            validators: [{ type: 'required', message: 'Level of experience is required' }]
        },
        {
            width: 1,
            fieldName: 'age',
            fieldLabel: 'Age',
            fieldType: 'number',
            defaultValue: 25,
            required: true,
            min: 10,
            max: 90,
            validators: [
                { type: 'required', message: 'Age is required' },
                { type: 'min', value: 10, message: 'Minimum age is 10' },
                { type: 'max', value: 90, message: 'Maximum age is 90' }
            ]
        },
        {
            width: 1,
            fieldName: 'weight',
            fieldLabel: 'Weight',
            fieldType: 'number',
            defaultValue: 70,
            required: true,
            min: 20,
            max: 150,
            suffix: ' KG',
            validators: [
                { type: 'required', message: 'Weight is required' },
                { type: 'min', value: 20, message: 'Minimum weight is 20kg' },
                { type: 'max', value: 150, message: 'Maximum weight is 150kg' }
            ]
        },
        {
            width: 1,
            fieldName: 'height',
            fieldLabel: 'Height',
            fieldType: 'number',
            defaultValue: 172,
            required: true,
            min: 50,
            max: 200,
            suffix: ' CM',
            validators: [
                { type: 'required', message: 'Height is required' },
                { type: 'min', value: 50, message: 'Minimum height is 50cm' },
                { type: 'max', value: 200, message: 'Maximum height is 200cm' }
            ]
        },
        {
            width: 1,
            fieldName: 'gender',
            fieldLabel: 'Gender',
            fieldType: 'radio',
            defaultValue: 'MALE',
            required: true,
            options: [
                { label: 'Male', value: 'MALE' },
                { label: 'Female', value: 'FEMALE' }
            ],
            validators: [{ type: 'required', message: 'Gender is required' }]
        }
    ]
};
