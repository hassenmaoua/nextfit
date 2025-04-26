import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UpdateProfileRequest } from '../models/requests/update-profile-request.model';
import { UserDTO } from '../auth/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly USER_URL = `${environment.apiUrl}/user`;

    constructor(private http: HttpClient) {}

    updateProfile(body: UpdateProfileRequest) {
        return this.http.post<UserDTO>(`${this.USER_URL}/update-profile`, body);
    }

    changePassword(userId: string, oldPassword: string, newPassword: string) {
        const params = new HttpParams().set('userId', userId.toString()).set('oldPassword', oldPassword).set('newPassword', newPassword);

        return this.http.put<UserDTO>(`${this.USER_URL}/change-password`, null, { params });
    }
}
