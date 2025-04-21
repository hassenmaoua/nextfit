import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'app-home',
    imports: [CommonModule, DividerModule, ButtonModule, RippleModule, RouterModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    features = ['Workout Plan', 'Nutrition Guidance', 'Diet Plan'];
    buttons = buttons;
}

export const buttons = [
    {
        title: '💪 FitStart',
        link: '/plans/generate',
        queryParams: { plan: 'BASIC' },
        includedFeatures: ['Workout Plan']
    },
    {
        title: '🔥 ProForm',
        link: '/plans/generate',
        queryParams: { plan: 'NUTRITION' },
        includedFeatures: ['Workout Plan', 'Nutrition Guidance'],
        locked: true
    },
    {
        title: '🥗 NutriTrack',
        link: '/plans/generate',
        queryParams: { plan: 'MEAL' },
        includedFeatures: ['Diet Plan']
    },
    {
        title: '⚡ BodyFuel Combo',
        link: '/plans/generate',
        queryParams: { plan: 'DUAL' },
        includedFeatures: ['Workout Plan', 'Diet Plan']
    },
    {
        title: '🌟 Elite Total Wellness',
        link: '/plans/generate',
        queryParams: { plan: 'PREMIUM' },
        includedFeatures: ['Workout Plan', 'Nutrition Guidance', 'Diet Plan'],
        ribbon: 'Best Value',
        locked: true
    }
];
