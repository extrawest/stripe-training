import { Component, Input, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
})
export class ProductsTableComponent implements OnInit {
  @Input() set numberSpan(quantity: number) {
    if (quantity) {
      this.spanNumber = quantity;
      console.log(this.spanNumber);
    }
  }
  @Input() product: ProductInterface;
  products: ProductInterface[] = [];
  sortOrder: string | null;
  spanNumber: number = 24;
  constructor() {}

  ngOnInit(): void {}
}
