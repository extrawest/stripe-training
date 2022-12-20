import { Component, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ProductInterface } from 'src/app/shared/interfaces/product.interface';
import { Store } from '@ngrx/store';
import { AppState } from './../../../../app.state';
import * as ProductActions from '../../../../shared/store/products/actions/products.action';
import { selectProducts } from '../../../../shared/store/products/selectors/products.selector';
import { SpanTypesEnum } from './../../../../shared/enums/span-types.enum';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SortEnum } from 'src/app/shared/enums/sort.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  categories: string[] = [];
  sortTypes: string[] = ['desc', 'asc'];
  productLimits: string[] = ['3', '5', '7'];
  products: ProductInterface[] = [];
  nzSpan: number;
  spanTypes = SpanTypesEnum;
  category: string;
  limit: string;
  sortType: SortEnum;
  componentDestroyed$: Subject<void> = new Subject();
  constructor(
    private productService: ProductService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.productService
      .getCategories()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((data) => {
        data.map((el: string) => this.categories.push(el));
      });
    this.store.dispatch(ProductActions.getSelectedProducts({}));
    this.store
      .select(selectProducts)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((data) => {
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
    if (sortType === SortEnum.ASCEND) {
      this.sortType = SortEnum.ASCEND;
    } else {
      this.sortType = SortEnum.DESCEND;
    }
    this.manageProducts();
  }

  manageProducts() {
    this.store.dispatch(
      ProductActions.getSelectedProducts({
        category: this.category,
        sortType: this.sortType,
        limit: this.limit,
      })
    );
    this.store
      .select(selectProducts)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((data) => {
        this.products = data;
      });
  }

  setDisplayItemsInARow(span: SpanTypesEnum): void {
    this.nzSpan = span;
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
