import { Cart } from '../models/cart.model';
import { createReducer, on } from '@ngrx/store';
import {
  removeProduct,
  removeAllProducts,
  plusItem,
  minusItem,
} from '../actions/cart.action';

export const initialState: Cart[] = [];

export const CartReducer = createReducer(
  initialState,

  on(removeProduct, (state, action) => {
    const cart: Cart[] = [...state];
    cart.splice(action.payload, 1);
    return cart;
  }),

  on(removeAllProducts, () => {
    return [];
  }),

  on(plusItem, (state, action) => {
    let cart: Cart[] = [...state];
    let updatedState = [];
    if (cart.length > 0) {
      const item = cart.find(
        (el) => el.product.id === action.payload.product.id
      )!;
      if (item) {
        const itemIndex = cart.indexOf(item);
        cart[itemIndex] = {
          product: item.product,
          quantity: item.quantity + 1,
          totalSum: +(item.totalSum + item.product.price).toFixed(2),
        };
        updatedState = cart;
      } else {
        updatedState = [...cart, action.payload];
      }
    } else {
      updatedState = [...state, action.payload];
    }
    return updatedState;
  }),

  on(minusItem, (state, action) => {
    let cart = [...state];
    const item: Cart = cart.find(
      (el) => el.product.id === action.payload.product.id
    )!;
    const itemIndex = cart.indexOf(item);
    if (item.quantity > 1) {
      cart[itemIndex] = {
        product: item.product,
        quantity: item.quantity - 1,
        totalSum: +(item.totalSum - item.product.price).toFixed(2),
      };
    } else if (item.quantity === 1) {
      cart.splice(itemIndex, 1);
    }
    return cart;
  })
);
