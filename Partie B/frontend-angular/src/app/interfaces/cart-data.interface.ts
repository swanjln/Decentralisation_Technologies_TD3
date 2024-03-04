// cart-data.interface.ts
export interface CartData {
  cartItems: CartItem[];
  totalPrice: number;
}

export interface CartItem {
  productId: number;
  quantity: number;
  price: string;
  product: Product;
}

export interface Product {
  productId: number;
  productName: string;
  description: string;
  price: number;
  category: string;
  stock: string;
}

