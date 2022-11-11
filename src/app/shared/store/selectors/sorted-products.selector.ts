import { createSelector } from '@ngrx/store';
import { Product } from '../models/product.model';
import { AppState } from 'src/app/app.state';

export const selectSortedProducts = (state: AppState) => state.sortedProducts;

export const selectFeatureSortedProducts = createSelector(
  selectSortedProducts,
  (state: Product[]) => {
    return state;
  }
);
