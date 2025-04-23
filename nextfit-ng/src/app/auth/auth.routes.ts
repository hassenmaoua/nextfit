import { Route } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { AuthComponent } from './auth.component';
import { RegistrationCompleteComponent } from './components/registration-complete/registration-complete.component';
import { AuthGuard } from './services/auth.guard';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

export default {
    path: 'auth',
    component: AuthComponent,
    children: [
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'activate-account', component: ActivateAccountComponent },
        { path: 'registration-complete', canActivate: [AuthGuard], component: RegistrationCompleteComponent },
        { path: 'reset-password', component: ResetPasswordComponent },
        { path: 'forgot-password', component: ForgotPasswordComponent },
        { path: '', pathMatch: 'full', redirectTo: 'login' }
    ]
} as Route;
