import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/components/app.floatingconfigurator';

@Component({
    selector: 'app-error',
    imports: [ButtonModule, RippleModule, RouterModule, ButtonModule],
    standalone: true,
    template: `
        <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20 flex flex-col items-center" style="border-radius: 53px">
            <div class="gap-4 flex flex-col items-center">
                <div class="flex justify-center items-center border-2 rounded-full" style="height: 3.2rem; width: 3.2rem; border-color: var(--primary-color)">
                    <i class="pi pi-fw pi-exclamation-circle !text-2xl" style="color: var(--primary-color)"></i>
                </div>
                <h1 class="text-surface-900 dark:text-surface-0 font-bold text-5xl mb-2">Error Occured</h1>
                <span class="text-muted-color mb-8">Requested resource is not available.</span>
                <img src="https://primefaces.org/cdn/templates/sakai/auth/asset-error.svg" alt="Error" class="mb-8" width="80%" />
                <div class="col-span-12 mt-8 text-center">
                    <p-button label="Go to Home Page" routerLink="/" severity="primary" />
                </div>
            </div>
        </div>
    `
})
export class NotAvailable {}
