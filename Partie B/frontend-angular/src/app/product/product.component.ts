import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { CartData } from '../interfaces/cart-data.interface'; // Import the CartData interface

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  cartItems: any[] = [];
  totalPrice: number = 0;
  selectedUserId: number = 1; // Default selected user ID
  userIds: number[] = [1, 2, 3]; // Array of user IDs

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCartData(this.selectedUserId);
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }

  getCartData(userId: number): void {
    this.cartService.getCartData(userId)
      .subscribe((cartData: CartData) => {
        this.cartItems = cartData.cartItems;
        this.totalPrice = cartData.totalPrice;
      });
  }

  addToCart(product: any): void {
    this.cartService.addToCart(this.selectedUserId, product)
      .subscribe(() => {
        this.getCartData(this.selectedUserId); // Refresh cart data after adding
      });
  }

  removeCartItem(productId: number): void {
    this.cartService.removeCartItem(this.selectedUserId, productId)
      .subscribe(() => {
        this.getCartData(this.selectedUserId); // Refresh cart data after removing the item
      });
  }

  onUserIdChange(): void {
    this.getCartData(this.selectedUserId); // Refresh cart data when user ID changes
  }
}
