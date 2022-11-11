import { Product } from './shared/store/models/product.model';
import { Cart } from './shared/store/models/cart.model';

export interface AppState {
  cart: Cart[];
  readonly products: Product[];
  readonly sortedProducts: Product[];
}
