import { layoutConfig } from '../../layout/service/layout.service';

export interface UserDTO {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    gender: 'MALE' | 'FEMALE';
    birthDate: string;
    age: number;
    phone: string;
    currentActivity: string;
    weight: number;
    height: number;
    enabled: boolean;
    accountLocked: boolean;
    registrationComplete: boolean;
    config: layoutConfig;
}

export interface loginRequest {
    email: string;
    password: string;
}
