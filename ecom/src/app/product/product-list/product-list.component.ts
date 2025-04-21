import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/product';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  sortOrder: string = '';
  constructor(private ps: ProductService, private cs: CartService) {}

  ngOnInit(): void {
    //getting products list..
    this.ps.getProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  addToCart(product: Product): void {
    this.cs.addToCart(product).subscribe({
      // next: () => {},
    });
  }

  applyFilter(event: Event): void {
    console.log(event);
    const searchTerm = (event.target as HTMLInputElement).value;
    searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
    if (searchTerm === '') {
      this.filteredProducts = this.products;
    }
    this.sortProducts(this.sortOrder);
  }

  sortProducts(order: string) {
    this.sortOrder = order;
    if (order === 'priceLowHigh') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (order === 'priceHighLow') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }
  }
}
