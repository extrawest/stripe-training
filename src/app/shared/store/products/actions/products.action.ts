import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product.model';
import { ProductInterface } from 'src/app/shared/interfaces/product.interface';

export const getAllProducts = createAction('[PRODUCTS] get all products');

export const getAllProductsSuccess = createAction(
  '[PRODUCTS] get all products success',
  props<{ response: Product[] }>()
);

export const getAllProductsError = createAction(
  '[PRODUCTS] get all products error',
  props<{ error: any }>()
);

export const getSelectedProducts = createAction(
  '[PRODUCTS] get selected products',
  props<{ category: string; sortType: string; limit: string }>()
);

export const getSelectedProductsSuccess = createAction(
  '[PRODUCTS] get products success',
  props<{ response: ProductInterface[] }>()
);

export const getSelectedProductsError = createAction(
  '[PRODUCTS] get products error',
  props<{ error: any }>()
);

export const getSelectedProductsBySortTypeAndLimit = createAction(
  '[PRODUCTS] get products by sort type and limit',
  props<{ sortType: string; limit: string }>()
);

export const getSelectedProductsBySortTypeAndLimitSuccess = createAction(
  '[PRODUCTS] get products by sort type and limit success',
  props<{ response: ProductInterface[] }>()
);

export const getSelectedProductsBySortTypeAndLimitError = createAction(
  '[PRODUCTS] get products by sort type and limit error',
  props<{ error: any }>()
);
