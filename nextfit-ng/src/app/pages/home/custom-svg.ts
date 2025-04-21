import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'custom-svg',
    imports: [CommonModule],
    templateUrl: 'custom-svg.html'
})
export class CustomSVG {
    @Input() type!: 'simple' | 'normal' | 'advanced';
}
