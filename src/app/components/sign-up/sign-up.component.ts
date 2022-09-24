import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { emailValidator } from '../../custom-validators/email.validator';
import { passwordMatcher } from '../../custom-validators/password-matcher';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm!: FormGroup;
  loader: boolean = false;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private toastr: ToastrService,private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      retype_password: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)]],
    }, {
      validators: [emailValidator('email'), passwordMatcher('password', 'retype_password')]
    })
  }

  onSignUp() {
    this.loader = true;
    this.userService.signUp(this.signUpForm.value).subscribe(
      () => {
        this.loader = false;
        this.toastr.success('SignUp Successfully');
        this.router.navigate(['/signin']);
      },
      (err) => {
        this.loader = false;
        this.toastr.error(err.error.message);
      }
    )
  }

}
