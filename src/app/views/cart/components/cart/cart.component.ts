import { Component, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  products: ProductInterface[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
