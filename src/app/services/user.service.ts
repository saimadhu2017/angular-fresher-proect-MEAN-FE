import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  login = new BehaviorSubject(false);

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  signUp(user: any): Observable<any> {
    const options = new HttpHeaders({ 'Content-Type': 'application/json' });
    return (
      this.http.post('http://localhost:3000/api/signup', user, { headers: options })
    );
  }

  signIn(user: any): Observable<any> {
    const options = new HttpHeaders({ 'Content-Type': 'application/json' });
    return (
      this.http.post('http://localhost:3000/api/signin', user, { headers: options }).pipe(
        map((v) => {
          this.login.next(true)
          return (v)
        })
      )
    );
  }

  signOut(): Observable<any> {
    this.login.next(false);
    return (
      this.http.get('http://localhost:3000/api/signout')
    );
  }

  getUserDetils(): Observable<any> {
    const token = this.cookieService.get('Token');
    const id = this.cookieService.get('id');

    const options = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return (
      this.http.get(`http://localhost:3000/api/user/${id}`, { headers: options })
    );
  }

  updateUser(user: any): Observable<any> {
    const token = this.cookieService.get('Token');
    const id = this.cookieService.get('id');

    const options = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return (
      this.http.put(`http://localhost:3000/api/user/${id}`, user, { headers: options })
    );
  }
}
