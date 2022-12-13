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
    const clonedState: Cart[] = [...state];

    if (!clonedState.length) {
      clonedState.push(action.payload);

      return clonedState;
    }

    const itemIndex = clonedState.findIndex(
      (cart) => cart.product.id === action.payload.product.id
    );

    if (itemIndex === -1) {
      clonedState.push(action.payload);

      return clonedState;
    }

    clonedState[itemIndex] = {
      ...clonedState[itemIndex],
      quantity: clonedState[itemIndex].quantity + 1,
      totalSum: +(
        clonedState[itemIndex].totalSum + clonedState[itemIndex].product.price
      ).toFixed(2),
    };

    return clonedState;
  }),

  on(minusItem, (state, action) => {
    const clonedState: Cart[] = [...state];
    const itemIndex = clonedState.findIndex(
      (cart) => cart.product.id === action.payload.product.id
    );
    if (clonedState[itemIndex].quantity > 1) {
      clonedState[itemIndex] = {
        ...clonedState[itemIndex],
        quantity: clonedState[itemIndex].quantity - 1,
        totalSum: +(
          clonedState[itemIndex].totalSum - clonedState[itemIndex].product.price
        ).toFixed(2),
      };
    }
    if (clonedState[itemIndex].quantity === 1) {
      clonedState.splice(itemIndex, 1);
    }
    return clonedState;
  })
);
