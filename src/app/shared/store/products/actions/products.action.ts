import { createAction, props } from '@ngrx/store';
import { ProductInterface } from 'src/app/shared/interfaces/product.interface';
import { SortEnum } from 'src/app/shared/enums/sort.enum';

export const getSelectedProducts = createAction(
  '[PRODUCTS] get selected products',
  props<{ category?: string; sortType?: SortEnum; limit?: string }>()
);

export const getSelectedProductsSuccess = createAction(
  '[PRODUCTS] get products success',
  props<{ response: ProductInterface[] }>()
);

export const getSelectedProductsError = createAction(
  '[PRODUCTS] get products error',
  props<{ error: any }>()
);
