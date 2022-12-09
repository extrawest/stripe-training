import { Product } from './shared/store/products/models/product.model';
import { Cart } from './shared/store/cart/models/cart.model';

export interface AppState {
  cart: Cart[];
  readonly products: Product[];
}
