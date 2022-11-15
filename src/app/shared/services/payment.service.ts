import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  checkout(stripeToken: string): Observable<any> {
    const url = 'http://localhost:3000/checkout';
    return this.http.post<any>(url, { token: stripeToken }).pipe(
      map((data) => data),
      catchError((error) => throwError(() => error))
    );
  }

  createPaymentIntent = (cart: any, currency: any) => {
    const url = 'http://localhost:3000/checkout';
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
