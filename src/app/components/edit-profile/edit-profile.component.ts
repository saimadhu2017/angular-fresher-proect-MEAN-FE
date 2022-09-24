import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { emailValidator } from 'src/app/custom-validators/email.validator';
import { passwordMatcher } from 'src/app/custom-validators/password-matcher';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  updateUserForm!: FormGroup;
  loader: boolean = false;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loader = false;
    this.updateUserForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      retype_password: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)]],
    }, {
      validators: [emailValidator('email'), passwordMatcher('password', 'retype_password')]
    })
  }

  onSave(n: string) {
    this.loader = true;
    if (n == 'name') {
      this.userService.updateUser({ name: this.updateUserForm.value.name }).subscribe(
        () => {
          this.toastr.success("Saved successfully");
          this.ngOnInit();
        },
        (err) => {
          this.toastr.error("Failed to Save");
          this.ngOnInit();
        }
      )
    }
    else if (n == 'email') {
      this.userService.updateUser({ email: this.updateUserForm.value.email }).subscribe(
        () => {
          this.toastr.success("Saved successfully");
          this.ngOnInit();
        },
        (err) => {
          this.toastr.error("Failed to Save");
          this.ngOnInit();
        }
      )
    }
    else if (n == 'password') {
      this.userService.updateUser({ password: this.updateUserForm.value.password }).subscribe(
        () => {
          this.toastr.success("Saved successfully");
          this.ngOnInit();
        },
        (err) => {
          this.toastr.error("Failed to Save")
          this.ngOnInit();
        }
      )
    }
  }

}
