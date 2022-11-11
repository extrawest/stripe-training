import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../../../../app.state';
import { Subject } from 'rxjs';
import { selectFeatureCart } from './../../../../shared/store/selectors/cart.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cartItems: number;
  items$: Subject<number> = new Subject();
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.store.select(selectFeatureCart).subscribe((data) => {
      this.cartItems = data.length;
    });
  }
}
