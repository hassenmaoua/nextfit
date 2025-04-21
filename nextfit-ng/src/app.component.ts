import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Spinner } from './app/shared/components/spinner';
import { Progress } from './app/shared/components/progress';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, Spinner, Progress],
    template: `
        <router-outlet></router-outlet>
        <app-spinner></app-spinner>
        <app-progress></app-progress>
    `
})
export class AppComponent {}
