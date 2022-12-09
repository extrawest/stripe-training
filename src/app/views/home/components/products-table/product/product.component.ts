import { Component, Input, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/shared/interfaces/product.interface';
import { Store } from '@ngrx/store';
import { Product } from '../../../../../shared/store/products/models/product.model';
import { AppState } from './../../../../../app.state';
import * as ProductActions from '../../../../../shared/store/cart/actions/cart.action';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() set numberSpan(quantity: number) {
    if (quantity) {
      this.spanNumber = quantity;
    }
  }
  @Input() product: ProductInterface;
  spanNumber: number = 24;
  selectedProducts: Product[] = [];
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  addProductToCart(product: Product) {
    const payload = {
      product: product,
      quantity: 1,
      totalSum: product.price,
    };
    this.store.dispatch(ProductActions.plusItem({ payload: payload }));
  }
}
