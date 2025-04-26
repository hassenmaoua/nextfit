import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { FieldType, FieldValidator, FieldConfig, SelectOption } from '../../../models/form-builder/form-config.model';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TextareaModule } from 'primeng/textarea';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'app-field',
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DropdownModule,
        CheckboxModule,
        SliderModule,
        InputTextModule,
        SelectButtonModule,
        InputGroupModule,
        InputGroupAddonModule,
        AutoCompleteModule,
        InputNumberModule,
        RadioButtonModule,
        TextareaModule,
        DatePickerModule
    ],
    templateUrl: './field.component.html',
    styleUrl: './field.component.scss'
})
export class FieldComponent implements OnInit {
    @Input() formGroup!: FormGroup;
    @Input() controlName!: string;

    @Input() config?: FieldConfig;

    @Input() id?: string;
    @Input() type!: FieldType;
    @Input() disabled: boolean = false;
    @Input() validators?: FieldValidator[];
    @Input() label?: string;
    @Input() placeholder?: string;
    @Input() required?: boolean;
    @Input() options: SelectOption[] = [];
    @Input() min?: number;
    @Input() max?: number;
    @Input() step?: number;
    @Input() suffix?: string;
    @Input() groupAddons?: { value: string; position: 'start' | 'end' }[];

    suggestions: string[] = [];

    ngOnInit(): void {
        if (this.config) {
            this.id = this.id ?? this.config.fieldName;
            this.type = this.type ?? this.config.fieldType;
            this.label = this.label ?? this.config.fieldLabel;
            this.placeholder = this.placeholder ?? this.config.placeholder ?? '';
            this.required = this.required ?? this.config.required ?? false;
            this.validators = this.validators ?? this.config.validators ?? [];
            this.options = this.options.length > 0 ? this.options : (this.config.options ?? []);
            this.min = this.min ?? this.config.min;
            this.max = this.max ?? this.config.max;
            this.step = this.step ?? this.config.step;
            this.suffix = this.suffix ?? this.config.suffix;
            this.groupAddons = this.groupAddons && this.groupAddons.length > 0 ? this.groupAddons : (this.config.groupAddons ?? []);
        }
    }

    get control() {
        return this.formGroup.controls[this.controlName];
    }

    search(event: any) {
        const query = event.query.toLowerCase();
        this.suggestions = this.options.filter((opt) => opt.label.toLowerCase().includes(query)).map((opt) => opt.label);
    }
}
