import { Action } from '@ngrx/store';
import { Product } from '../models/product.model';

export const ADD_PRODUCT = '[PRODUCT] Add';
export const REMOVE_PRODUCT = '[PRODUCT] Remove';
export const REMOVE_All = '[PRODUCT] RemoveAll';

export class AddProduct implements Action {
  readonly type = ADD_PRODUCT;

  constructor(public payload: Product) {}
}

export class RemoveProduct implements Action {
  readonly type = REMOVE_PRODUCT;

  constructor(public payload: number) {}
}

export class RemoveAll implements Action {
  readonly type = REMOVE_All;

  constructor() {}
}

export type Actions = AddProduct | RemoveProduct | RemoveAll;
