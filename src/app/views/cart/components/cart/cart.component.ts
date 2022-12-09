import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../../../../app.state';
import * as ProductActions from '../../../../shared/store/cart/actions/cart.action';
import { selectFeatureCart } from '../../../../shared/store/cart/selectors/cart.selector';
import { Cart } from 'src/app/shared/store/cart/models/cart.model';
import {
  minusItem,
  plusItem,
} from '../../../../shared/store/cart/actions/cart.action';
import { PaymentService } from 'src/app/shared/services/payment/payment.service';
import { Router } from '@angular/router';
import {
  loadStripe,
  StripeElements,
  Stripe,
  StripeCardElement,
} from '@stripe/stripe-js';
import { from } from 'rxjs';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  selectedProducts: Cart[] = [];
  totalSum: number = 0;
  stripePromise = loadStripe(environment.stripeKey);
  stripe: Stripe;
  stripeElements: StripeElements;
  cardElement: StripeCardElement;
  isModalVisible: boolean = false;

  constructor(
    @Inject(DOCUMENT) document: Document,
    private store: Store<AppState>,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.select(selectFeatureCart).subscribe((data) => {
      this.selectedProducts = data;
      this.totalSum = 0;
      this.selectedProducts.map((el) => {
        this.totalSum += el.totalSum;
        this.totalSum = parseFloat(this.totalSum.toFixed(2));
      });
    });
  }

  getSelectedProducts() {
    this.store.select(selectFeatureCart).subscribe((data) => {
      this.selectedProducts = data;
      this.totalSum = 0;
      this.selectedProducts.map((el) => {
        this.totalSum += el.totalSum;
        this.totalSum = parseFloat(this.totalSum.toFixed(2));
      });
    });
  }

  removeProduct(index: number) {
    this.store.dispatch(ProductActions.removeProduct({ payload: index }));
  }

  removeAllProducts() {
    this.store.dispatch(ProductActions.removeAllProducts());
  }

  plusItem(product: Cart) {
    this.store.dispatch(plusItem({ payload: product }));
  }

  minusItem(product: Cart) {
    this.store.dispatch(minusItem({ payload: product }));
  }

  openModal() {
    this.isModalVisible = true;
  }

  createStripeCart() {
    from(this.stripePromise).subscribe((stripe) => {
      if (stripe) {
        this.stripe = stripe;
        this.stripeElements = stripe.elements();
        this.cardElement = this.stripeElements.create('card');
        const submitButton = document.getElementById('submit') as HTMLElement;
        this.cardElement.mount(submitButton);
      }
    });
  }

  checkOut() {
    this.stripe.createToken(this.cardElement).then((result) => {
      this.paymentService
        .createPaymentIntent({ ...result, price: this.totalSum }, 'usd')
        .subscribe((data) => {
          if (data.client_secret) {
            from(
              this.stripe.confirmCardPayment(data.client_secret, {
                payment_method: {
                  card: this.cardElement,
                },
              })
            ).subscribe((data) => {
              this.removeAllProducts();
              if (data.paymentIntent) {
                this.router.navigateByUrl('/success');
              } else {
                this.router.navigateByUrl('/cancel');
              }
            });
          } else {
            this.router.navigateByUrl('/card');
          }
        });
    });
  }

  handleCancel() {
    this.isModalVisible = false;
  }
}
