import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/components/app.layout';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/errors/notfound';

import { Empty } from './app/pages/empty/empty';
import { AuthGuard } from './app/auth/services/auth.guard';
import { HomeComponent } from './app/pages/home/home.component';
import { Access } from './app/pages/errors/access';
import { Error } from './app/pages/errors/error';
import { NotAvailable } from './app/pages/errors/available';
import authRoutes from './app/auth/auth.routes';

export const appRoutes: Routes = [
    authRoutes,
    { path: 'landing', component: Landing },
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
    {
        path: 'error',
        component: Error,
        children: [
            { path: '', component: NotAvailable },
            { path: 'notfound', component: Notfound },
            { path: 'access', component: Access }
        ]
    },
    { path: '**', redirectTo: '/error/notfound' }
];
