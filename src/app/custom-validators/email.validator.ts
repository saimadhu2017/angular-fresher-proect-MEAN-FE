import {FormGroup} from '@angular/forms';

export function emailValidator(controlName:string){
    return(
        (formGroup:FormGroup)=>{
            const email=formGroup.controls[controlName];

            if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value))){
                email.setErrors({invalidEmail:'Invalid Email Format'});
            }else{
                email.setErrors(null);
            }
        }
    );
}