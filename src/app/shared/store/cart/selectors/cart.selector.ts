import { createSelector } from '@ngrx/store';
import { Cart } from '../models/cart.model';
import { AppState } from 'src/app/app.state';

export const selectCart = (state: AppState) => state.cart;

export const selectFeatureCart = createSelector(selectCart, (state: Cart[]) => {
  return state;
});

export const selectLengthFeatureCart = createSelector(
  selectCart,
  (state: Cart[]) => {
    return state.length;
  }
);
