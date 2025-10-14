
// src/types.ts


export interface ProductName {
    en: string;
    ru: string;
    uk: string;
}

export interface Product {
  id: string;
  name: ProductName;
  current_price: number;
  original_price: number;
  quantity: number;
  discount_percentage: number;
  product_url: string;
  image_url: string;
  availableQuantity: number;
}
export interface Delivery {
  name: ProductName;
  price: number;
}

export interface StoreData {
  products: Product[];
  delivery: Delivery;
}

