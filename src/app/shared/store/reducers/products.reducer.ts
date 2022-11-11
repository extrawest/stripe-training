import { Product } from '../models/product.model';
import { createReducer, on } from '@ngrx/store';
import { insert_products } from '../actions/products.action';

export const initialState: Product[] = [];

export const ProductsReducer = createReducer(
  initialState,
  on(insert_products, (state, action) => {
    return action.payload;
  })
);
