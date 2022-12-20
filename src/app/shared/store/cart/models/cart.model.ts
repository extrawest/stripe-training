export interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  image: string;
  rating: {
    count: number;
    rate: number;
  };
  quantity?: number;
}

export interface Cart {
  product: Product;
  quantity: number;
  totalSum: number;
}
