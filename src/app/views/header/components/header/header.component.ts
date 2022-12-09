import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../../../../app.state';
import { selectLengthFeatureCart } from '../../../../shared/store/cart/selectors/cart.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cartItems: number = 0;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(selectLengthFeatureCart).subscribe((length: number) => {
      this.cartItems = length;
    });
  }
}
