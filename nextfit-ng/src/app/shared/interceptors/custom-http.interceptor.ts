import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../auth/services/auth.service';

export const customHttpInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);

    let authToken: string | undefined;

    authToken = authService.getAuthFromLocalStorage();

    // Check if the request URL should be excluded
    if (isExcludedUrl(req.url)) {
        return next(req); // Skip interceptor for excluded URLs
    }

    // Modify headers or add new headers as needed
    const authReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${authToken}`
        }
    });

    return next(authReq);
};

function isExcludedUrl(url: string): boolean {
    const excludedUrls = ['login', 'register', 'activate-account', 'password-reset'];
    return excludedUrls.some((excludedUrl) => url.includes(excludedUrl));
}
