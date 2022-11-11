import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product.model';

export const insert_products = createAction(
  '[PRODUCTS] insert',
  props<{ payload: Product[] }>()
);
