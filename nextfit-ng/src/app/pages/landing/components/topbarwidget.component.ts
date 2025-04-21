import { Component } from '@angular/core';
import { StyleClassModule } from 'primeng/styleclass';
import { Router, RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'topbar-widget',
    imports: [RouterModule, StyleClassModule, ButtonModule, RippleModule],
    template: `
        <a class="flex items-center mr-5" routerLink="/">
            <div style="width: 5rem;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 390">
                    <g fill="none" stroke="gray" stroke-width="2">
                        <path
                            d="M245.3 178.37a.2.2 0 0 1 .37.11l.37 133.01a1.77 1.77 0 0 0 1.77 1.77l47.2-.02a2 2 0 0 0 1.99-2V94.28a1.78 1.78 0 0 0-1.78-1.78h-48.99q-.53 0-.83.44l-92.59 133.88a.31.31 0 0 1-.57-.17q.02-64.95 0-128.74c0-.95-.41-2.04-.27-3.03a2.13 2.12 3.8 0 0-2.11-2.4q-23.67 0-47.05.22-1.68.02-1.74 2.3-.21 8.15-.21 16.31-.01 99.79.21 200.28a1.67 1.66 89.8 0 0 1.66 1.66h48.22q1.25 0 1.96-1.03l92.39-133.85M428.54 94.308a1.55 1.55 0 0 0-1.548-1.553l-120.12-.21a1.55 1.55 0 0 0-1.552 1.547l-.08 45.62a1.55 1.55 0 0 0 1.548 1.553l120.12.21a1.55 1.55 0 0 0 1.552-1.547l.08-45.62M403.24 184.18a1.93 1.93 0 0 0-1.93-1.93h-94.12a1.93 1.93 0 0 0-1.93 1.93v44.88a1.93 1.93 0 0 0 1.93 1.93h94.12a1.93 1.93 0 0 0 1.93-1.93v-44.88"
                            vector-effect="non-scaling-stroke"
                        />
                    </g>
                    <path
                        fill="var(--primary-color)"
                        d="M0 0h520v390H0V0Zm245.3 178.37a.2.2 0 0 1 .37.11l.37 133.01a1.77 1.77 0 0 0 1.77 1.77l47.2-.02a2 2 0 0 0 1.99-2V94.28a1.78 1.78 0 0 0-1.78-1.78h-48.99q-.53 0-.83.44l-92.59 133.88a.31.31 0 0 1-.57-.17q.02-64.95 0-128.74c0-.95-.41-2.04-.27-3.03a2.13 2.12 3.8 0 0-2.11-2.4q-23.67 0-47.05.22-1.68.02-1.74 2.3-.21 8.15-.21 16.31-.01 99.79.21 200.28a1.67 1.66 89.8 0 0 1.66 1.66h48.22q1.25 0 1.96-1.03l92.39-133.85Zm183.24-84.062a1.55 1.55 0 0 0-1.548-1.553l-120.12-.21a1.55 1.55 0 0 0-1.552 1.547l-.08 45.62a1.55 1.55 0 0 0 1.548 1.553l120.12.21a1.55 1.55 0 0 0 1.552-1.547l.08-45.62Zm-25.3 89.872a1.93 1.93 0 0 0-1.93-1.93h-94.12a1.93 1.93 0 0 0-1.93 1.93v44.88a1.93 1.93 0 0 0 1.93 1.93h94.12a1.93 1.93 0 0 0 1.93-1.93v-44.88Z"
                    />
                    <path
                        fill="#fff"
                        d="m245.3 178.37-92.39 133.85q-.71 1.03-1.96 1.03h-48.22a1.67 1.66 89.8 0 1-1.66-1.66q-.22-100.49-.21-200.28 0-8.16.21-16.31.06-2.28 1.74-2.3 23.38-.22 47.05-.22a2.13 2.12 3.8 0 1 2.11 2.4c-.14.99.27 2.08.27 3.03q.02 63.79 0 128.74a.31.31 0 0 0 .57.17L245.4 92.94q.3-.44.83-.44h48.99a1.78 1.78 0 0 1 1.78 1.78v216.96a2 2 0 0 1-1.99 2l-47.2.02a1.77 1.77 0 0 1-1.77-1.77l-.37-133.01a.2.2 0 0 0-.37-.11Z"
                    />
                    <rect width="123.22" height="48.72" x="-61.61" y="-24.36" fill="#fff" rx="1.55" transform="rotate(.1 -66858.33 210270.937)" />
                    <rect width="97.98" height="48.74" x="305.26" y="182.25" fill="#fff" rx="1.93" />
                </svg>
            </div>
            <span class="text-4xl font-bold">Next<span class="text-primary">Fit</span></span>
        </a>

        <div class="items-center bg-surface-0 dark:bg-surface-900 grow justify-between hidden lg:flex absolute lg:static w-full left-0 top-full px-12 lg:px-0 z-20 rounded-border">
            <ul class="list-none p-0 m-0 flex lg:items-center select-none flex-col lg:flex-row cursor-pointer gap-8">
                <li>
                    <a (click)="router.navigate(['/landing'], { fragment: 'home' })" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                        <span>Home</span>
                    </a>
                </li>
                <li>
                    <a (click)="router.navigate(['/landing'], { fragment: 'features' })" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                        <span>Features</span>
                    </a>
                </li>
                <li>
                    <a (click)="router.navigate(['/landing'], { fragment: 'highlights' })" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                        <span>Highlights</span>
                    </a>
                </li>
                <li>
                    <a (click)="router.navigate(['/landing'], { fragment: 'pricing' })" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                        <span>Pricing</span>
                    </a>
                </li>
            </ul>
            <div class="flex border-t lg:border-t-0 border-surface py-4 lg:py-0 mt-4 lg:mt-0 gap-2">
                <a pButton pRipple label="Login" routerLink="/auth/login" [rounded]="true" [text]="true"></a>
                <a pButton pRipple label="Register" routerLink="/auth/register" [rounded]="true"></a>
            </div>
        </div>
    `
})
export class TopbarWidget {
    constructor(public router: Router) {}
}
