export interface UpdateProfileRequest {
    firstName: string;
    lastName: string;
    birthDate: Date;
    phone: string;
    currentActivity: string;
    height: number;
    weight: number;
    gender: 'MALE' | 'FEMALE';
}
