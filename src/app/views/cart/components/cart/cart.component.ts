import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../../../../app.state';
import * as ProductActions from '../../../../shared/store/actions/cart.action';
import { selectFeatureCart } from '../../../../shared/store/selectors/cart.selector';
import { Cart } from 'src/app/shared/store/models/cart.model';
import {
  minus_item,
  plus_item,
} from '../../../../shared/store/actions/cart.action';
import { PaymentService } from 'src/app/shared/services/payment.service';
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
  stripePromise = loadStripe(environment.firebaseConfig.stripeKey);
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
    this.getSelectedProducts();
  }

  getSelectedProducts() {
    this.store.select(selectFeatureCart).subscribe((data) => {
      this.selectedProducts = data;
      this.totalSum = 0;
      this.selectedProducts.map((el) => {
        this.totalSum += el.totalSum;
      });
    });
  }

  removeProduct(index: number) {
    this.store.dispatch(ProductActions.remove_product({ payload: index }));
    this.getSelectedProducts();
  }

  removeAllProducts() {
    this.store.dispatch(ProductActions.remove_all_products());
    this.getSelectedProducts();
  }

  plusItem(product: Cart) {
    this.store.dispatch(plus_item({ payload: product }));
  }

  minusItem(product: Cart) {
    this.store.dispatch(minus_item({ payload: product }));
    this.getSelectedProducts();
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
        .subscribe({
          complete: () => {
            this.router.navigateByUrl('/home');
            this.removeAllProducts();
          },
        });
    });
  }

  handleCancel() {
    this.isModalVisible = false;
  }
}
