import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return (
      this.http.get('http://localhost:3000/api/products')
    );
  }

  getProduct(productId:string):Observable<any>{
    return(
      this.http.get(`http://localhost:3000/api/product/${productId}`)
    );
  }
}
