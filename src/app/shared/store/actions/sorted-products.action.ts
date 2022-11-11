import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product.model';

export const insert_sorted_products = createAction(
  '[SORTED_PRODUCTS] insert',
  props<{ payload: Product[] }>()
);
