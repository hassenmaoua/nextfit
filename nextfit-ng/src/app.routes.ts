import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/components/app.layout';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';

import { Empty } from './app/pages/empty/empty';
import { AuthGuard } from './app/auth/services/auth.guard';
import { HomeComponent } from './app/pages/home/home.component';

export const appRoutes: Routes = [
    { path: 'landing', component: Landing },
    { path: 'auth', loadChildren: () => import('./app/auth/auth.routes') },
    { path: 'notfound', component: Notfound },
    {
        path: '',
        component: AppLayout,
        canActivate: [AuthGuard],
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'empty', component: Empty },
            { path: 'plans', loadChildren: () => import('./app/routes/plan.routes') },
            { path: '', pathMatch: 'full', redirectTo: 'home' }
        ]
    },
    { path: '**', redirectTo: '/notfound' }
];
