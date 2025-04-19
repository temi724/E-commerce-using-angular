import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  constructor(private ps: ProductService) {}

  ngOnInit(): void {
    //getting products list..
    this.ps.getProducts().subscribe((data) => {
      this.products = data;
      console.log(this.products);
    });
  }
}
