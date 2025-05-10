import { inject, Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthInitializer {
    private readonly authService = inject(AuthService);

    async initialize(): Promise<void> {
        await this.authService.getUserByToken();
    }
}
