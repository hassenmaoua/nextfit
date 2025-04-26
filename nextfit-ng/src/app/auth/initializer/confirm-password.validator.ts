import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ConfirmPasswordValidator {
    /**
     * Check matching password with confirm password
     * @param control AbstractControl
     */
    static MatchPassword(control: AbstractControl): void {
        const password = control.get('password')?.value;
        const confirmPassword = control.get('cPassword')?.value;

        if (password !== confirmPassword) {
            control.get('cPassword')?.setErrors({ ConfirmPassword: true });
        }
    }

    static MatchNewPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('newPassword')?.value;
        const confirmPassword = control.get('cPassword')?.value;

        return password === confirmPassword ? null : { mismatch: true };
    };
}
