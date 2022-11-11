import { Component, Input, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/shared/interfaces/product.interface';
import { Store } from '@ngrx/store';
import { Product } from '../../../../../shared/store/models/product.model';
import { Cart } from 'src/app/shared/store/models/cart.model';
import { AppState } from './../../../../../app.state';
import * as ProductActions from '../../../../../shared/store/actions/cart.action';
import { selectFeatureCart } from 'src/app/shared/store/selectors/cart.selector';
import { first } from 'rxjs';

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
    this.store
      .select(selectFeatureCart)
      .pipe(first())
      .subscribe((data) => {
        if (data.length) {
          const cart: Cart | undefined = data.find(
            (el) => el.product.id === product.id
          );
          if (cart === undefined) {
            this.store.dispatch(
              ProductActions.add_product({ payload: payload })
            );
          } else {
            this.store.dispatch(ProductActions.plus_item({ payload: cart }));
          }
        } else {
          this.store.dispatch(ProductActions.add_product({ payload: payload }));
        }
      });
  }
}
