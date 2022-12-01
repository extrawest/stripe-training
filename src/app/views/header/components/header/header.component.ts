import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../../../../app.state';
import { selectFeatureCart } from './../../../../shared/store/selectors/cart.selector';
import { Cart } from 'src/app/shared/store/models/cart.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cartItems: number = 0;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(selectFeatureCart).subscribe((data: Cart[]) => {
      this.cartItems = 0;
      data.map((el) => {
        this.cartItems += el.quantity;
      });
    });
  }
}
