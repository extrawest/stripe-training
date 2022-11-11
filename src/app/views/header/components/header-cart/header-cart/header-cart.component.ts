import { Component, OnInit } from '@angular/core';
import * as ProductActions from '../../../../../shared/store/actions/cart.action';
import { Store } from '@ngrx/store';
import { Product } from '../../../../../shared/store/models/product.model';
import { AppState } from './../../../../../app.state';
import { first } from 'rxjs';
import { selectFeatureCart } from './../../../../../shared/store/selectors/cart.selector';

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
    this.store
      .select(selectFeatureCart)
      .pipe(first())
      .subscribe((data) => {
        this.selectedProducts = data;
        this.numberOfItems = this.selectedProducts.length;
        this.selectedProducts.map((el) => {
          this.totalSum += el.price;
        });
      });
  }

  removeAllProducts() {
    this.store.dispatch(ProductActions.remove_all_products());
    this.getSelectedProducts();
  }
}
