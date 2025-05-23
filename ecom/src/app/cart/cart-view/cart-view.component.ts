import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-cart-view',
  standalone: false,
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.css',
})
export class CartViewComponent implements OnInit {
  constructor(private cs: CartService) {}

  cartItems: Product[] = [];
  total: number = 0;

  ngOnInit(): void {
    this.cs.getCartItems().subscribe((data) => {
      this.cartItems = data;
      this.total = this.getTotal();
    });
  }

  getTotal(): number {
    this.total = 0;
    this.cartItems.forEach((item) => {
      this.total += item.price;
    });
    return this.total;
  }

  removeItem(productId: number) {
    this.cs.removeItem(productId).subscribe(() => {
      this.cartItems = this.cartItems.filter((item) => item.id !== productId);
      this.getTotal();
    });
  }
  clearCart(): void {
    this.cs.clearCart().subscribe();
  }
}
