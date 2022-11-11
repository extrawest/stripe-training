import { Product } from '../models/product.model';
import { createReducer, on } from '@ngrx/store';
import { insert_sorted_products } from '../actions/sorted-products.action';

export const initialState: Product[] = [];

export const SortedProductsReducer = createReducer(
  initialState,
  on(insert_sorted_products, (state, action) => {
    return action.payload;
  })
);
