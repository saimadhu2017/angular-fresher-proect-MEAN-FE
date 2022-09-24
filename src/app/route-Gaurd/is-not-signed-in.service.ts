import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../services/user.service';


@Injectable({
  providedIn: 'root'
})
export class IsNotSignedInService implements CanActivate {

  login: boolean = false;

  constructor(private cookieService: CookieService, private userService: UserService) { }

  canActivate(): boolean {
    const token = this.cookieService.get('Token');
    const id = this.cookieService.get('id');
    this.userService.login.subscribe(
      (v) => { this.login = v; }
    )
    if (!token || !id || !this.login) {
      return (true);
    }
    return (false);
  }
}
