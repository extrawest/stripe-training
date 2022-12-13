import { Component, OnDestroy } from '@angular/core';
import * as ProductActions from '../../../../../shared/store/cart/actions/cart.action';
import { Store } from '@ngrx/store';
import { AppState } from './../../../../../app.state';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectFeatureCart } from '../../../../../shared/store/cart/selectors/cart.selector';
import { Cart } from 'src/app/shared/store/cart/models/cart.model';

@Component({
  selector: 'app-header-cart',
  templateUrl: './header-cart.component.html',
  styleUrls: ['./header-cart.component.scss'],
})
export class HeaderCartComponent implements OnDestroy {
  selectedProducts: Cart[] = [];
  totalSum: number = 0;
  numberOfItems: number = 0;
  componentDestroyed$: Subject<void> = new Subject();
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select(selectFeatureCart)
      .pipe(takeUntil(this.componentDestroyed$))
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
      .pipe(takeUntil(this.componentDestroyed$))
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
    this.store.dispatch(ProductActions.removeAllProducts());
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
