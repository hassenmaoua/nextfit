import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { FieldType, FieldValidator, SelectOption } from '../../../models/form-config.model';
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
export class FieldComponent {
    @Input() id?: string;
    @Input() formGroup!: FormGroup;
    @Input() controlName!: string;
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

    get control() {
        return this.formGroup.controls[this.controlName];
    }

    search(event: any) {
        const query = event.query.toLowerCase();
        this.suggestions = this.options.filter((opt) => opt.label.toLowerCase().includes(query)).map((opt) => opt.label);
    }
}
