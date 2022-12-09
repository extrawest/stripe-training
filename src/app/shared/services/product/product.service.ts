import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductInterface } from '../../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Array<string>> {
    return this.http
      .get<Array<string>>('https://fakestoreapi.com/products/categories')
      .pipe(
        map((data) => data),
        catchError((error) => throwError(() => error))
      );
  }

  getAllProducts(): Observable<ProductInterface[]> {
    return this.http
      .get<ProductInterface[]>('https://fakestoreapi.com/products')
      .pipe(
        map((data) => data),
        catchError((error) => throwError(() => error))
      );
  }

  getSelectedProducts(category?: string, sortType?: string, limit?: string) {
    return this.http
      .get<ProductInterface[]>(
        'https://fakestoreapi.com/products/category/' +
          category +
          '?sort=' +
          sortType +
          '&limit=' +
          limit
      )
      .pipe(
        map((data) => data),
        catchError((error) => throwError(() => error))
      );
  }

  getSelectedProductsBySortTypeAndLimit(sortType?: string, limit?: string) {
    return this.http
      .get<ProductInterface[]>(
        'https://fakestoreapi.com/products/?sort=' +
          sortType +
          '&limit=' +
          limit
      )
      .pipe(
        map((data) => data),
        catchError((error) => throwError(() => error))
      );
  }
}
