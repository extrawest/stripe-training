import { createAction, props } from '@ngrx/store';
import { Cart } from '../models/cart.model';

export const add_product = createAction(
  '[CART] Add',
  props<{ payload: Cart }>()
);
export const remove_product = createAction(
  '[CART] Remove',
  props<{ payload: number }>()
);
export const remove_all_products = createAction('[CART] RemoveAll');

export const plus_item = createAction(
  '[CART plus item',
  props<{ payload: Cart }>()
);

export const minus_item = createAction(
  '[CART minus item',
  props<{ payload: Cart }>()
);
