import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environment/environment';

export const customHttpInterceptor: HttpInterceptorFn = (req, next) => {
    const authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

    let authToken: string | undefined;
    try {
        const lsValue = localStorage.getItem(authLocalStorageToken);
        if (lsValue) {
            const authData = JSON.parse(lsValue);
            authToken = authData.authToken;
        }
    } catch (error) {
        console.error(error);
    }

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
