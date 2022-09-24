import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartLengthByUser = new BehaviorSubject(0);

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  addProductToCart(data: any): Observable<any> {
    const token = this.cookieService.get('Token');
    const id = this.cookieService.get('id');

    const options = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return (
      this.http.post(`http://localhost:3000/api/product/cart/${id}`, data, { headers: options })
    );
  }

  getCartUser(): Observable<any> {
    const token = this.cookieService.get('Token');
    const id = this.cookieService.get('id');

    const options = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return (
      this.http.get(`http://localhost:3000/api/product/cart/${id}`, { headers: options })
    );
  }

  deleteProductInCart(itemId: string): Observable<any> {
    const token = this.cookieService.get('Token');
    const id = this.cookieService.get('id');

    const options = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return (
      this.http.delete(`http://localhost:3000/api/product/cart/${id}/${itemId}`, { headers: options })
    );
  }

  getCartLengthByUser(): Observable<any> {
    const token = this.cookieService.get('Token');
    const id = this.cookieService.get('id');
    console.log(id);

    const options = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return (
      this.http.get(`http://localhost:3000/api/product/cart/length/${id}`, { headers: options })
    );
  }
}
