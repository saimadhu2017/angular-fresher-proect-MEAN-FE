import { FormGroup } from '@angular/forms';

export function passwordMatcher(controlName: string, controlNameComp: string) {
    return (
        (formGroup: FormGroup) => {
            const password = formGroup.controls[controlName];
            const retype_password = formGroup.controls[controlNameComp];

            if (password.value !== retype_password.value) {
                retype_password.setErrors({ invalidPassword: 'Password not Matched' });
            } else {
                retype_password.setErrors(null);
            }
        }
    );
}