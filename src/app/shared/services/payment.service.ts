import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  createPaymentIntent = (cart: any, currency: any) => {
    const url = 'https://shop-mu-steel.vercel.app/checkout';
    return this.http
      .post<any>(url, {
        products: cart,
        currency: currency,
      })
      .pipe(
        map((data) => data),
        catchError((error) => throwError(() => error))
      );
  };
}
