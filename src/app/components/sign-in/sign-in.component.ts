import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';
import { emailValidator } from '../../custom-validators/email.validator';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm!: FormGroup;
  loader: boolean = false;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private cookieService: CookieService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    }, {
      validators: emailValidator('email')
    })
  }

  onSignIn(): void {
    this.loader = true;
    this.userService.signIn(this.signInForm.value).subscribe(
      (value) => {
        this.loader = false;
        this.cookieService.set('Token', value.token, { expires: 1, sameSite: 'Lax' });
        this.cookieService.set('id', value.user._id, { expires: 1, sameSite: 'Lax' });
        this.toastr.success('Login Successfully');
        this.router.navigate(['/']);
      },
      (err) => {
        this.loader = false;
        this.toastr.error(err.error.message);
      }
    )
  }
}
