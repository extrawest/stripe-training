import { Product } from './../models/product.model';
import * as ProductActions from './../actions/product.action';

export function reducer(state: Product[] = [], action: ProductActions.Actions) {
  switch (action.type) {
    case ProductActions.ADD_PRODUCT:
      return [...state, action.payload];
    case ProductActions.REMOVE_PRODUCT:
      const index = action.payload;
      return [...state.slice(0, index), ...state.slice(index + 1)];
    case ProductActions.REMOVE_All:
      return [];
    default:
      return state;
  }
}
