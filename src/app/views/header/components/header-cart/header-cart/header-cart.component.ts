import { Component, OnInit } from '@angular/core';
import * as ProductActions from './../../../../../shared/actions/product.action';
import { Store } from '@ngrx/store';
import { Product } from './../../../../../shared/models/product.model';
import { AppState } from './../../../../../app.state';

@Component({
  selector: 'app-header-cart',
  templateUrl: './header-cart.component.html',
  styleUrls: ['./header-cart.component.scss'],
})
export class HeaderCartComponent implements OnInit {
  selectedProducts: Product[] = [];
  totalSum: number = 0;
  numberOfItems: number = 0;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.getSelectedProducts();
  }

  getSelectedProducts() {
    this.store.subscribe(data => {
      this.selectedProducts = Object.values(data)[0] as Product[];
      this.numberOfItems = this.selectedProducts.length;
      this.selectedProducts.map((el) => {
        this.totalSum += el.price;
      });
    });
  }

  removeAllProducts() {
    this.store.dispatch(new ProductActions.RemoveAll());
  }
}
