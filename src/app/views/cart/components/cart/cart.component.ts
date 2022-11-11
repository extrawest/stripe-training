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

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  selectedProducts: Cart[] = [];
  totalSum: number = 0;

  constructor(private store: Store<AppState>) {}

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
}
