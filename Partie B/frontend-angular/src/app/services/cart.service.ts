import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartData } from '../interfaces/cart-data.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = '/api/cart'; // Adjust URL according to your API

  constructor(private http: HttpClient) { }

  getCartData(userId: number): Observable<CartData> {
    return this.http.get<CartData>(`${this.apiUrl}/${userId}`); // Pass userId as part of the URL
  }

  addToCart(userId: number, product: any): Observable<any> {
    // Assuming your API accepts product ID and quantity
    const cartItem = { productId: product.productId, quantity: 1 };
    return this.http.post<any>(`${this.apiUrl}/${userId}`, cartItem); // Include userId in the URL
  }

  removeCartItem(userId: number, productId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${userId}/item/${productId}`); // Include userId in the URL
  }
}
