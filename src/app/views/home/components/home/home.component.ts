import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { SortEnum } from 'src/app/shared/enums/sort.enum';
import { ProductLimitEnum } from 'src/app/shared/enums/product-limit.enum';
import { ProductInterface } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  categories: string[] = [];
  sortTypes: string[] = [];
  productLimits: string[] = [];
  products: ProductInterface[] = [];
  nzSpan: number;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getCategories();
    this.sortTypes = Object.values(SortEnum);
    this.productLimits = Object.values(ProductLimitEnum);
    this.getProducts();
  }

  getCategories() {
    this.productService.getCategories().subscribe((data) => {
      data.map((el: string) => this.categories.push(el));
    });
  }

  getProducts() {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  limitProducts(productLimit: string) {
    this.productService.getLimitedProducts(productLimit).subscribe((data) => {
      this.products = data;
    });
  }

  sortProducts(typeOfSort: string) {
    this.productService.getSortedProducts(typeOfSort).subscribe((data) => {
      this.products = data;
    });
  }

  getProductsbyCategory(category: string) {
    this.productService.getProductsByCategory(category).subscribe((data) => {
      this.products = data;
    });
  }

  displayOneItemInARow() {
    this.nzSpan = 24;
  }

  displayThreeItemsInARow() {
    this.nzSpan = 7;
  }

  displayFourItemsInARow() {
    this.nzSpan = 5;
  }
}
