import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { Dialog } from 'primeng/dialog';
import { Image } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs';

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [ButtonModule, RouterModule, CommonModule, Dialog, Image],
    template: `
        <div class="overflow-hidden">
            <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <router-outlet [attr.key]="routeKey"></router-outlet>
                    </div>
                </div>
            </div>
        </div>

        <p-dialog [visible]="(hasError$ | async) ?? false" [modal]="true" [breakpoints]="{ '1199px': '75vw', '575px': '90vw' }" [style]="{ width: '30rem' }" [draggable]="false" [resizable]="false" [closeOnEscape]="true" (onHide)="closeErrorDialog()">
            <div class="flex flex-col items-center text-center p-4">
                <div class="w-24 h-24 mb-4">
                    <p-image [src]="errorImage" alt="Error Triangle" class="w-full h-full object-contain" />
                </div>

                <h3 class="text-xl font-bold text-red-600 mb-2">Oops! Something went wrong</h3>
                <p class="text-gray-700 mb-6">{{ errorMessage$ | async }}</p>

                <button pButton type="button" label="Close" icon="pi pi-check" class="p-button-rounded p-button-danger" (click)="closeErrorDialog()"></button>
            </div>
        </p-dialog>
    `
})
export class AuthComponent {
    private authService = inject(AuthService);
    routeKey = 0;

    constructor(private router: Router) {
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
            this.routeKey++; // changes the key to force reload
        });
    }

    hasError$ = this.authService.hasErrorSubject.asObservable();
    errorMessage$ = this.authService.errorMessage.asObservable();

    errorImage = this.authService.errorImage;

    closeErrorDialog() {
        this.authService.closeError();
    }
}
