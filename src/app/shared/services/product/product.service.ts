import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductInterface } from '../../interfaces/product.interface';
import { SortEnum } from './../../enums/sort.enum';

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

  getSelectedProducts(category?: string, sortType?: SortEnum, limit?: string) {
    if (!category && !sortType && !limit) {
      return this.http
        .get<ProductInterface[]>('https://fakestoreapi.com/products')
        .pipe(
          map((data) => data),
          catchError((error) => throwError(() => error))
        );
    }
    if (!category) {
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
    } else {
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
  }
}
