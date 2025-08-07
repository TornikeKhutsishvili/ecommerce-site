import { inject, Injectable } from '@angular/core';
import { DummyApiResponse, dummyProductModel } from '../models/product.model';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://dummyjson.com/products';
  private http = inject(HttpClient);

  getProducts(): Observable<dummyProductModel[]> {
    return this.http.get<DummyApiResponse>(this.apiUrl).pipe(
      map(res => res.products.slice(0, 31))
    );
  }

  getProductById(id: number): Observable<dummyProductModel> {
    return this.http.get<dummyProductModel>(`${this.apiUrl}/${id}`);
  }

  getProductCarusel(): Observable<dummyProductModel[]> {
    return this.http.get<DummyApiResponse>(this.apiUrl).pipe(
      map(res => res.products.slice(0, 3))
    );
  }

  getRandomProductCarusel(): Observable<dummyProductModel[]> {
    return this.http.get<DummyApiResponse>(this.apiUrl).pipe(
      map(res => {
        const products = res.products;

        for (let i = products.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [products[i], products[j]] = [products[j], products[i]];
        }

        return products.slice(0, 3);
      })
    );
  }

  getProductsByCategory(category: string): Observable<dummyProductModel[]> {
    return this.http.get<DummyApiResponse>(`${this.apiUrl}/category/${category}`).pipe(
      map(res => res.products)
    );
  }

}