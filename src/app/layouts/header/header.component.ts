import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  login: boolean = false;
  cartLength: number = 0;
  subscriber!: Subscription;

  constructor(private userService: UserService, private cartService: CartService, private cookieService: CookieService, private roter: Router, private toastr: ToastrService) {
    this.userService.login.subscribe(
      (v) => {
        this.login = v;
        if (this.login) {
          //Reason for setTime Out is to load cookies first
          setTimeout(() => {
            this.cartService.getCartLengthByUser().subscribe(
              (value) => {
                this.cartLength = value.cartLength;
                this.subscriber = this.cartService.cartLengthByUser.subscribe(
                  (cartLengthValue) => {
                    this.cartLength = this.cartLength + cartLengthValue;
                  }
                )
              },
              (err) => { console.log(err) }
            );
          }, 0)
        } else {
          this.cartLength = 0;
        }
      }
    );
  }

  ngOnInit(): void {
  }

  signOut() {
    this.cookieService.deleteAll();
    this.userService.signOut().subscribe(() => {
      this.roter.navigate(['/signin']);
      this.toastr.success('LogOut Successfully');
      setTimeout(()=>{location.reload();},1000);
    })

  }
}
