import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { SortEnum } from 'src/app/shared/enums/sort.enum';
import { ProductLimitEnum } from 'src/app/shared/enums/product-limit.enum';
import { ProductInterface } from 'src/app/shared/interfaces/product.interface';
import { Store } from '@ngrx/store';
import { Product } from '../../../../shared/store/models/product.model';
import { AppState } from './../../../../app.state';
import * as ProductActions from '../../../../shared/store/actions/products.action';
import { selectFeatureProducts } from '../../../../shared/store/selectors/products.selector';
import { first } from 'rxjs';
import { selectFeatureSortedProducts } from '../../../../shared/store/selectors/sorted-products.selector';
import * as SortedProductActions from '../../../../shared/store/actions/sorted-products.action';

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
  constructor(
    private productService: ProductService,
    private store: Store<AppState>
  ) {}

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
      this.store.dispatch(ProductActions.insert_products({ payload: data }));
      this.products = data;
    });
  }

  limitProducts(productLimit: string) {
    this.productService.getLimitedProducts(productLimit).subscribe((data) => {
      this.products = data;
      this.store.dispatch(ProductActions.insert_products({ payload: data }));
      this.store.dispatch(
        SortedProductActions.insert_sorted_products({ payload: [] })
      );
    });
  }

  sortProducts(typeOfSort: string) {
    this.store
      .select(selectFeatureSortedProducts)
      .pipe(first())
      .subscribe((data) => {
        if (data.length === 0) {
          this.store
            .select(selectFeatureProducts)
            .pipe(first())
            .subscribe((products) => {
              this.sort(products, typeOfSort);
            });
        } else {
          this.sort(data, typeOfSort);
        }
      });
  }

  sort(data: Product[], typeOfSort: string) {
    this.products = [...data];
    if (typeOfSort === 'asc') {
      this.products.sort((p1, p2) => {
        return p1.price - p2.price;
      });
    } else if (typeOfSort === 'desc') {
      this.products.sort((p1, p2) =>
        p1.price < p2.price ? 1 : p1.price > p2.price ? -1 : 0
      );
    }
  }

  getProductsbyCategory(category: string) {
    this.store
      .select(selectFeatureProducts)
      .pipe(first())
      .subscribe((data) => {
        let productsbyCategory: ProductInterface[] = [];
        data.map((el) => {
          if (el.category === category) {
            productsbyCategory.push(el);
          }
        });
        this.products = productsbyCategory;
        this.store.dispatch(
          SortedProductActions.insert_sorted_products({
            payload: this.products,
          })
        );
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
