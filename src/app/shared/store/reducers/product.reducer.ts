import { Product } from '../models/product.model';
import * as ProductActions from '../actions/product.action';
import { createReducer, on } from '@ngrx/store';
import {
  add_product,
  remove_product,
  remove_all_products,
} from './../actions/product.action';

export const initialState: Product[] = [];

export const cartReducer = createReducer(
  initialState,
  on(add_product, (state, action) => {
    return [...state, action.payload];
  }),
  on(remove_product, (state, action) => {
    return [
      ...state.slice(0, action.payload),
      ...state.slice(action.payload + 1),
    ];
  }),
  on(remove_all_products, () => {
    return [];
  })
);
