import { Product } from './shared/store/models/product.model';

export interface AppState {
  readonly cart: Product[];
}
