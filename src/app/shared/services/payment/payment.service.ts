import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  createPaymentIntent = (cart: any, currency: any) => {
    return this.http
      .post<any>(environment.backendUrl, {
        products: cart,
        currency: currency,
      })
      .pipe(
        map((data) => data),
        catchError((error) => throwError(() => error))
      );
  };
}
