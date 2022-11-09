import { Product } from './shared/models/product.model';

export interface AppState {
  readonly products: Product[];
}
