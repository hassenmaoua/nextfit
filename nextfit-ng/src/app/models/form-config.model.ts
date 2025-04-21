export type FieldType = 'text' | 'number' | 'select' | 'multiSelect' | 'selectButton' | 'checkbox' | 'radio' | 'textarea' | 'date' | 'range' | 'time';

// This would come from your backend API
export interface FormSectionConfig {
    id: string;
    label: string;
    description?: string;
    size?: 1 | 2 | 3 | 4 | 5 | 6;
    fields: FormFieldConfig[];
}

export interface FormFieldConfig {
    width: 1 | 2 | 3 | 4 | 5 | 6;
    fieldName: string;
    fieldLabel: string;
    fieldType: FieldType;
    defaultValue?: any;
    required?: boolean;
    validators?: FieldValidator[];
    options?: SelectOption[]; // For select/radio fields
    min?: number; // For number/range fields
    max?: number; // For number/range fields
    step?: number; // For number/range fields
    suffix?: string;
    placeholder?: string;
    groupAddons?: { value: string; position: 'start' | 'end' }[];
    dependencies?: FieldDependency[]; // For conditional fields
}

export interface FieldValidator {
    type: 'required' | 'min' | 'max' | 'minLength' | 'maxLength' | 'pattern' | 'email';
    value?: any; // For min, max, minLength, maxLength, pattern
    message: string;
}

export interface SelectOption {
    label: string;
    value: any;
}

export interface FieldDependency {
    fieldName: string;
    condition: (value: any) => boolean;
}
