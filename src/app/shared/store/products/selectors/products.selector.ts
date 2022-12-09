import { createSelector } from '@ngrx/store';
import { Product } from '../models/product.model';
import { AppState } from 'src/app/app.state';

export const selectProducts = (state: AppState) => state.products;

export const selectFeatureProducts = createSelector(
  selectProducts,
  (state: Product[]) => {
    return state;
  }
);
