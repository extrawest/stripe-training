import { createAction, props } from '@ngrx/store';
import { Cart } from '../models/cart.model';

export const removeProduct = createAction(
  '[CART] Remove item',
  props<{ payload: number }>()
);
export const removeAllProducts = createAction('[CART] RemoveAll');

export const plusItem = createAction(
  '[CART] Plus item',
  props<{ payload: Cart }>()
);

export const minusItem = createAction(
  '[CART] Minus item',
  props<{ payload: Cart }>()
);
