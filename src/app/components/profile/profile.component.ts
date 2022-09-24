import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  errMessage!: string;
  loader: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loader = true;
    this.userService.getUserDetils().subscribe(
      (value) => {
        this.user = value;
        this.loader = false;
        console.log(value);
      },
      (err) => {
        this.errMessage = err.error.message;
        this.loader = false;
      }
    );
  }

}
