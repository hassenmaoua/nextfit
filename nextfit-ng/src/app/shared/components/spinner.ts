import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { Observable } from 'rxjs';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
    standalone: true,
    selector: 'app-spinner',
    imports: [ProgressSpinner, CommonModule, AsyncPipe],
    template: `
        <div class="progress-spinner-container" *ngIf="isVisible$ | async">
            <p-progress-spinner ariaLabel="loading" />
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
        `
    ]
})
export class Spinner {
    isVisible$: Observable<boolean>;

    constructor(private readonly loadingService: LoadingService) {
        this.isVisible$ = this.loadingService.getLoadingStatus();
    }
}
