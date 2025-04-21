import { layoutConfig } from '../../layout/service/layout.service';

export interface UserDTO {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    config: layoutConfig;
}

export interface loginRequest {
    email: string;
    password: string;
}
