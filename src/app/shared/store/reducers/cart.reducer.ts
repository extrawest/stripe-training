import { Cart } from '../models/cart.model';
import { createReducer, on } from '@ngrx/store';
import {
  add_product,
  remove_product,
  remove_all_products,
  plus_item,
  minus_item,
} from '../actions/cart.action';

export const initialState: Cart[] = [];

export const CartReducer = createReducer(
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
  }),
  on(plus_item, (state, action) => {
    let cart = JSON.parse(JSON.stringify(state));

    cart.map((el: Cart) => {
      if (el.product.id === action.payload.product.id) {
        el.quantity! += 1;
        el.totalSum! += el.product.price;
      }
    });
    return cart;
  }),
  on(minus_item, (state, action) => {
    let cart = JSON.parse(JSON.stringify(state));
    cart.map((el: Cart) => {
      if (el.product.id === action.payload.product.id && el.quantity > 0) {
        el.quantity! -= 1;
        el.totalSum! -= el.product.price;
      }
    });
    return cart;
  })
);
