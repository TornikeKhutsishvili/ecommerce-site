import {
  inject,
  Injectable,
  signal,
  ViewChild
} from '@angular/core';

import {
  DummyApiResponse,
  dummyProductModel
} from '../models/product.model';

import {
  map,
  Observable
} from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://dummyjson.com/products';
  private limit = '?limit=200';
  private http = inject(HttpClient);

  // get all product
  getProducts(): Observable<dummyProductModel[]> {
    return this.http.get<DummyApiResponse>(this.apiUrl + this.limit).pipe(
      map(res => res.products)
    );
  }


  // get product by id
  getProductById(id: number): Observable<dummyProductModel> {
    return this.http.get<dummyProductModel>(`${this.apiUrl}/${id}`);
  }


  // get product carusel
  getProductCarusel(): Observable<dummyProductModel[]> {
    return this.http.get<DummyApiResponse>(this.apiUrl + this.limit).pipe(
      map(res => res.products.slice(0, 7))
    );
  }


  // get random product carusel
  getRandomProductCarusel(): Observable<dummyProductModel[]> {
    return this.http.get<DummyApiResponse>(this.apiUrl + this.limit).pipe(
      map(res => {
        const products = res.products;

        for (let i = products.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [products[i], products[j]] = [products[j], products[i]];
        }

        return products.slice(0, 7);
      })
    );
  }


  // get products by category
  getProductsByCategory(category: string): Observable<dummyProductModel[]> {
    return this.http.get<DummyApiResponse>(`${this.apiUrl}/category/${category}`).pipe(
      map(res => res.products)
    );
  }


  // load products
  loadproducts = signal<dummyProductModel[]>([]);

  loadProducts() {
    this.http.get<dummyProductModel[]>(this.apiUrl + this.limit)
      .subscribe(data => this.loadproducts.set(data));
  }


  addProduct(payload: any): Observable<any> {
    // return this.http.post(this.apiUrl, payload);
    return this.http.post(`${this.apiUrl}/add`, payload);
  }

}