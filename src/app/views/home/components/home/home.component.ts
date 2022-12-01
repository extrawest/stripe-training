import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ProductInterface } from 'src/app/shared/interfaces/product.interface';
import { Store } from '@ngrx/store';
import { Product } from '../../../../shared/store/models/product.model';
import { AppState } from './../../../../app.state';
import * as ProductActions from '../../../../shared/store/actions/products.action';
import { selectFeatureProducts } from '../../../../shared/store/selectors/products.selector';
import { first } from 'rxjs';
import { selectFeatureSortedProducts } from '../../../../shared/store/selectors/sorted-products.selector';
import * as SortedProductActions from '../../../../shared/store/actions/sorted-products.action';
import { SpanTypesEnum } from './../../../../shared/enums/span-types.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  categories: string[] = [];
  sortTypes: string[] = ['desc', 'asc'];
  productLimits: string[] = ['10', '15', '20'];
  products: ProductInterface[] = [];
  nzSpan: number;
  spanTypes = SpanTypesEnum;
  constructor(
    private productService: ProductService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.productService.getCategories().subscribe((data) => {
      data.map((el: string) => this.categories.push(el));
    });
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

  setDisplayItemsInARow(span: SpanTypesEnum): void {
    this.nzSpan = span;
  }
}
