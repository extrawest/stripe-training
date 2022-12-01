import { Component, OnInit } from '@angular/core';
import * as ProductActions from '../../../../../shared/store/actions/cart.action';
import { Store } from '@ngrx/store';
import { AppState } from './../../../../../app.state';
import { first } from 'rxjs';
import { selectFeatureCart } from './../../../../../shared/store/selectors/cart.selector';
import { Cart } from 'src/app/shared/store/models/cart.model';

@Component({
  selector: 'app-header-cart',
  templateUrl: './header-cart.component.html',
  styleUrls: ['./header-cart.component.scss'],
})
export class HeaderCartComponent implements OnInit {
  selectedProducts: Cart[] = [];
  totalSum: number = 0;
  numberOfItems: number = 0;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select(selectFeatureCart)
      .subscribe((data) => {
       this.selectedProducts = data;
        this.numberOfItems = this.selectedProducts.length;
        this.selectedProducts.map((el) => {
          this.totalSum += el.totalSum;
          this.totalSum = parseFloat(this.totalSum.toFixed(2));
        });
      });
  }

  getSelectedProducts() {
    this.store
      .select(selectFeatureCart)
      .pipe(first())
      .subscribe((data) => {
       this.selectedProducts = data;
        this.numberOfItems = this.selectedProducts.length;
        this.selectedProducts.map((el) => {
          this.totalSum += el.totalSum;
          this.totalSum = parseFloat(this.totalSum.toFixed(2));
        });
      });
  }

  removeAllProducts() {
    this.store.dispatch(ProductActions.remove_all_products());
  }
}
