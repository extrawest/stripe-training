import { Product } from '../models/product.model';
import { createReducer, on } from '@ngrx/store';
import { getSelectedProductsSuccess } from '../actions/products.action';

export const initialState: Product[] = [];

export const ProductsReducer = createReducer(
  initialState,

  on(getSelectedProductsSuccess, (_, result) => {
    return result.response;
  })
);
