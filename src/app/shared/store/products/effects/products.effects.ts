import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { ProductService } from './../../../../shared/services/product/product.service';
import * as productActions from './../actions/products.action';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  getSelectedProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.getSelectedProducts),
      exhaustMap((action) =>
        this.productService
          .getSelectedProducts(action.category, action.sortType, action.limit)
          .pipe(
            map((response) => {
              return productActions.getSelectedProductsSuccess({ response });
            }),
            catchError((error: any) =>
              of(productActions.getSelectedProductsError(error))
            )
          )
      )
    )
  );
}
