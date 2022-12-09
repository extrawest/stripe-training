import { Product } from '../models/product.model';
import { createReducer, on } from '@ngrx/store';
import {
  getAllProductsSuccess,
  getSelectedProductsSuccess,
  getSelectedProductsBySortTypeAndLimitSuccess,
} from '../actions/products.action';

export const initialState: Product[] = [];

export const ProductsReducer = createReducer(
  initialState,

  on(getSelectedProductsSuccess, (_, result) => {
    return result.response;
  }),
  on(getSelectedProductsBySortTypeAndLimitSuccess, (_, result) => {
    return result.response;
  }),
  on(getAllProductsSuccess, (_, result) => {
    return result.response;
  })
);
