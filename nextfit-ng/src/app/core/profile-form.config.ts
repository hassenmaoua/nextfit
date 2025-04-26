import { FieldConfig } from '../models/form-builder/form-config.model';

export const profileConfig: FieldConfig[] = [
    {
        width: 1,
        defaultValue: '',
        fieldName: 'firstName',
        fieldLabel: 'First Name',
        fieldType: 'text',
        required: true,

        validators: [{ type: 'required', message: 'First Name is required' }]
    },

    {
        width: 1,
        defaultValue: '',
        fieldName: 'lastName',
        fieldLabel: 'Last Name',
        fieldType: 'text',
        required: true,

        validators: [{ type: 'required', message: 'Last Name is required' }]
    },

    {
        width: 1,
        defaultValue: '',
        fieldName: 'birthDate',
        fieldLabel: 'Date of birth',
        fieldType: 'date',
        required: true,

        validators: [{ type: 'required', message: 'BirthDate is required' }]
    },

    {
        width: 1,
        defaultValue: '',
        fieldName: 'phone',
        fieldLabel: 'Phone Number',
        fieldType: 'text',
        required: true,

        validators: [{ type: 'required', message: 'Phone is required' }]
    },

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
];
