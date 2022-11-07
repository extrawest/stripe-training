import { Component, Input, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
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
