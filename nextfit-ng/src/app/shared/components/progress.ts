import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProgressBar } from 'primeng/progressbar';
import { FormService } from '../../services/form.service';

@Component({
    standalone: true,
    selector: 'app-progress',
    imports: [ProgressBar, CommonModule, AsyncPipe],
    template: `
        <div class="progress-spinner-container" *ngIf="isVisible$ | async">
            <div class="progress-spinner-content">
                <p-progressBar mode="indeterminate" [style]="{ height: '16px', width: '360px' }" styleClass="progress-bar" />

                <div class="phrase-container" [@fadeAnimation]="true">
                    <p class="loading-phrase">
                        {{ currentPhrase$ | async }}
                    </p>
                </div>
            </div>
        </div>
    `,
    styles: [
        `
            .progress-spinner-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                z-index: 9999;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .progress-spinner-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1rem;
                background: var(--secondary-50);
                padding: 2rem;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }

            .phrase-container {
                height: 2rem;
                overflow: hidden;
                position: relative;
                width: 100%;
                text-align: center;
            }

            .loading-phrase {
                margin: 0;
                padding: 0;
                font-size: 1.5rem;
            }
            .loading-phrase::after {
                display: inline-block;
                animation: dotty steps(1, end) 1.5s infinite;
                content: '     ';
            }

            @keyframes dotty {
                0% {
                    content: '     ';
                }
                25% {
                    content: '.    ';
                }
                50% {
                    content: '. .  ';
                }
                75% {
                    content: '. . .';
                }
                100% {
                    content: '     ';
                }
            }

            /* PrimeNG ProgressBar customization */
            :host ::ng-deep .progress-bar .p-progressbar {
                border-radius: 3px;
            }

            :host ::ng-deep .progress-bar .p-progressbar-value {
                background: var(--primary-color);
            }
        `
    ]
})
export class Progress {
    isVisible$: Observable<boolean>;
    currentPhrase$: Observable<string>;

    constructor(private readonly formService: FormService) {
        this.isVisible$ = this.formService.getLoadingStatus();
        this.currentPhrase$ = this.formService.getCurrentPhrase();
    }
}
