import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product.model';

export const add_product = createAction(
  '[PRODUCT] Add',
  props<{ payload: Product }>()
);
export const remove_product = createAction(
  '[PRODUCT] Remove',
  props<{ payload: number }>()
);
export const remove_all_products = createAction('[PRODUCT] RemoveAll');
