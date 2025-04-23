import { layoutConfig } from '../../layout/service/layout.service';

export interface UserDTO {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    registrationComplete: boolean;
    config: layoutConfig;
}

export interface loginRequest {
    email: string;
    password: string;
}
