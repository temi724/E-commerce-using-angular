import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = environment.apiUrl + '/cart';
  constructor(private http: HttpClient) {}

  addToCart(product: Product): Observable<Product> {
    // console.log(product);
    return this.http.post<Product>(this.apiUrl, product);
  }

  getCartItems(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  removeItem(productId: number): Observable<Product> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.delete<Product>(url);
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(this.apiUrl);
  }
}
