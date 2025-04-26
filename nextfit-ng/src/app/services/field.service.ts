import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldConfig } from '../models/form-builder/form-config.model';

@Injectable({
    providedIn: 'root'
})
export class FieldService {
    constructor(private fb: FormBuilder) {}

    createFormGroup(fields: FieldConfig[]): FormGroup {
        const group: { [key: string]: any } = {};

        fields.forEach((field) => {
            const validators = this.getValidators(field);
            group[field.fieldName] = [field.defaultValue || null, validators];
        });

        return this.fb.group(group);
    }

    getValidators(field: FieldConfig): any[] {
        if (!field.validators) return [];

        return field.validators.map((validator) => {
            switch (validator.type) {
                case 'required':
                    return Validators.required;
                case 'min':
                    return Validators.min(validator.value!);
                case 'max':
                    return Validators.max(validator.value!);
                case 'minLength':
                    return Validators.minLength(validator.value!);
                case 'maxLength':
                    return Validators.maxLength(validator.value!);
                case 'pattern':
                    return Validators.pattern(validator.value!);
                case 'email':
                    return Validators.email;
                default:
                    return Validators.nullValidator;
            }
        });
    }
}
