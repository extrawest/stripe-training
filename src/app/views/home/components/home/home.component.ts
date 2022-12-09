import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ProductInterface } from 'src/app/shared/interfaces/product.interface';
import { Store } from '@ngrx/store';
import { Product } from '../../../../shared/store/products/models/product.model';
import { AppState } from './../../../../app.state';
import * as ProductActions from '../../../../shared/store/products/actions/products.action';
import { selectProducts } from '../../../../shared/store/products/selectors/products.selector';
import { SpanTypesEnum } from './../../../../shared/enums/span-types.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  categories: string[] = [];
  sortTypes: string[] = ['desc', 'asc'];
  productLimits: string[] = ['3', '5', '7'];
  products: ProductInterface[] = [];
  nzSpan: number;
  spanTypes = SpanTypesEnum;
  category: string;
  limit: string;
  sortType: string;
  constructor(
    private productService: ProductService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.productService.getCategories().subscribe((data) => {
      data.map((el: string) => this.categories.push(el));
    });
    this.store.dispatch(ProductActions.getAllProducts());
    this.store.select(selectProducts).subscribe((data) => {
      this.products = data;
    });
  }

  getSelectedProductsByCategory(category: string) {
    this.category = category;
    this.manageProducts();
  }

  getSelectedProductsByLimit(limit: string) {
    this.limit = limit;
    this.manageProducts();
  }

  getSelectedProductsBySortType(sortType: string) {
    this.sortType = sortType;
    this.manageProducts();
  }

  manageProducts() {
    if (this.category) {
      this.store.dispatch(
        ProductActions.getSelectedProducts({
          category: this.category,
          sortType: this.sortType,
          limit: this.limit,
        })
      );
      this.store.select(selectProducts).subscribe((data) => {
        this.products = data;
      });
    } else {
      this.store.dispatch(
        ProductActions.getSelectedProductsBySortTypeAndLimit({
          sortType: this.sortType,
          limit: this.limit,
        })
      );
      this.store.select(selectProducts).subscribe((data) => {
        this.products = data;
      });
    }
  }

  setDisplayItemsInARow(span: SpanTypesEnum): void {
    this.nzSpan = span;
  }
}
