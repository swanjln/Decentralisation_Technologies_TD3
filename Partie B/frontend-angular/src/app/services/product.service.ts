// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = '/api/products'; // Adjust URL according to your API

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    console.log('productservice')
    return this.http.get<any[]>(this.apiUrl);
  }
}
