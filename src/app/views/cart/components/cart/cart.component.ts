import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from './../../../../shared/models/product.model';
import { AppState } from './../../../../app.state';
import * as ProductActions from './../../../../shared/actions/product.action';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  selectedProducts: Product[] = [];
  totalSum: number = 0;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.getSelectedProducts();
  }

  getSelectedProducts() {
    this.store.subscribe((data: any) => {
      this.selectedProducts = Object.values(data)[0] as Product[];
    });
  }

  removeProduct(index: number) {
    this.store.dispatch(new ProductActions.RemoveProduct(index));
  }

  removeAllProducts() {
    this.store.dispatch(new ProductActions.RemoveAll());
  }
}
