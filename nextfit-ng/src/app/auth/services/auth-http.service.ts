import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthModel } from '../models/auth.model';
import { environment } from '../../../environment/environment';
import { UserDTO } from '../models/user.model';
import { layoutConfig } from '../../layout/service/layout.service';

const API_AUTH_URL = `${environment.apiUrl}/auth`;
const API_PASSWORD_URL = `${environment.apiUrl}/password-reset`;

@Injectable({
    providedIn: 'root'
})
export class AuthHTTPService {
    constructor(private http: HttpClient) {}

    // public methods
    login(email: string, password: string): Observable<any> {
        return this.http.post<AuthModel>(`${API_AUTH_URL}/login`, {
            email,
            password
        });
    }

    // CREATE =>  POST: add a new user to the server
    createUser(user: { email: string; password: string }): Observable<any> {
        console.log(user);
        return this.http.post<any>(`${API_AUTH_URL}/register`, user);
    }

    confirm(token: string): Observable<any> {
        return this.http.get<any>(`${API_AUTH_URL}/activate-account?token=${token}`);
    }

    // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
    forgotPassword(email: string): Observable<boolean> {
        return this.http.post<boolean>(`${API_PASSWORD_URL}/request?email=${email}`, null);
    }

    changePassword(body: { token: string; password: any }) {
        return this.http.post<boolean>(`${API_PASSWORD_URL}/change`, body);
    }

    complet(body: any) {
        return this.http.post<boolean>(`${environment.apiUrl}/user/complete-registration`, body);
    }

    getUserByToken(token: string): Observable<UserDTO> {
        const httpHeaders = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });
        return this.http.post<UserDTO>(`${API_AUTH_URL}/verify_token?token=${token}`, null);
    }

    updateLayout(_config: layoutConfig): Observable<any> {
        return this.http.put(`${environment.apiUrl}/layout-config`, _config);
    }
}
