import { Component, Input, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/shared/interfaces/product.interface';
import { Store } from '@ngrx/store';
import { Product } from './../../../../../shared/models/product.model';
import { AppState } from './../../../../../app.state';
import * as ProductActions from './../../../../../shared/actions/product.action';
import { Observable } from 'rxjs';
import { first } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() set numberSpan(quantity: number) {
    if (quantity) {
      this.spanNumber = quantity;
    }
  }
  @Input() product: ProductInterface;
  spanNumber: number = 24;
  selectedProducts: Product[] = [];
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  addProductToCart(product: Product) {
    this.store.dispatch(new ProductActions.AddProduct(product));
  }
}
