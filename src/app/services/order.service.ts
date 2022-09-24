import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  count: number = 0;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  createOrder(address: string): Observable<any> {
    const token = this.cookieService.get('Token');
    const id = this.cookieService.get('id');

    const options = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    let data = {
      "transaction_id": id.slice(-3) + token.slice(-3) + this.count + time.slice(-3),
      "address": address
    }
    this.count = this.count + 1;

    return (
      this.http.post(`http://localhost:3000/api/order/${id}`, data, { headers: options })
    );
  }

  getOrderByUser(): Observable<any> {
    const token = this.cookieService.get('Token');
    const id = this.cookieService.get('id');

    const options = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return (
      this.http.get(`http://localhost:3000/api/orders/${id}`, { headers: options })
    );
  }
}
