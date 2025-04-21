import { FormSectionConfig } from '../models/form-config.model';

export const basicConfig: FormSectionConfig[] = [
    {
        id: 'fitnessGoal',
        label: 'Fitness Goals',
        description: 'Set your fitness goal and workout preferences.',
        size: 6,
        fields: [
            {
                width: 6,
                defaultValue: 'lose weight',
                fieldName: 'primaryGoal',
                fieldLabel: 'Primary Goal',
                fieldType: 'selectButton',
                required: true,

                options: [
                    { label: 'Lose Weight', value: 'lose weight' },
                    { label: 'Gain Muscle', value: 'gain muscle' },
                    { label: 'Improve Strength', value: 'improve strength' },
                    { label: 'Enhance Endurance', value: 'enhance endurance' },
                    { label: 'General Fitness', value: 'general fitness' }
                ],
                validators: [{ type: 'required', message: 'Primary Goal is required' }]
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
                    { type: 'required', message: 'Target Weight is required' },
                    { type: 'min', value: 30, message: 'Minimum weight is 30' },
                    { type: 'max', value: 200, message: 'Maximum weight is 200' }
                ]
            },
            {
                width: 2,
                defaultValue: 4,
                fieldName: 'timelineWeeks',
                fieldLabel: 'Target Timeline',
                fieldType: 'number',
                required: true,
                min: 1,
                max: 10,
                validators: [
                    { type: 'required', message: 'Weeks timeline is required' },
                    { type: 'min', value: 1, message: 'Minimum weeks is 1' },
                    { type: 'max', value: 10, message: 'Maximum weeks is 10' }
                ],
                suffix: ' Week'
            },
            {
                width: 2,
                defaultValue: true,
                fieldName: 'hasGymAccess',
                fieldLabel: 'Gym Access',
                fieldType: 'radio',
                required: true,
                options: [
                    {
                        label: 'Yes',
                        value: true
                    },
                    {
                        label: 'No',
                        value: false
                    }
                ],
                validators: [{ type: 'required', message: 'Gym Access is required' }]
            },
            {
                width: 3,
                fieldName: 'exerciseTypes',
                fieldLabel: 'Types of Exercise',
                placeholder: 'E.g. Running, Weightlifting',
                fieldType: 'multiSelect',
                required: true,

                options: [
                    { label: 'Calisthenics', value: 'calisthenics' },
                    { label: 'Body Building', value: 'bodybuilding' },
                    { label: 'Running', value: 'running' },
                    { label: 'Weightlifting', value: 'weightlifting' },
                    { label: 'Yoga', value: 'yoga' },
                    { label: 'Swimming', value: 'swimming' },
                    { label: 'Cycling', value: 'cycling' }
                ],
                validators: [{ type: 'required', message: 'Types of Exercise is required' }]
            },
            {
                width: 3,
                defaultValue: '3-4x/week',
                fieldName: 'exerciseFrequency',
                fieldLabel: 'Exercise Frequency',
                fieldType: 'selectButton',
                required: true,
                options: [
                    { label: '1 time/week', value: '1 time/week' },
                    { label: '1-2x/week', value: '1-2x/week' },
                    { label: '3-4x/week', value: '3-4x/week' },
                    { label: '5+ times/week', value: '5+ times/week' }
                ],
                validators: [{ type: 'required', message: 'Please enter at least one exercice frequency' }]
            },
            {
                width: 6,
                fieldName: 'motivationText',
                fieldLabel: 'Why is this goal important to you?',
                fieldType: 'textarea',
                required: false
            }
        ]
    }
];
