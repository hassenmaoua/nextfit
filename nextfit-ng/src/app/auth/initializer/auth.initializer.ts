import { inject, Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class AuthInitializer {
    private authService = inject(AuthService);

    async initialize(): Promise<void> {
        await this.authService.getUserByToken();
    }
}
