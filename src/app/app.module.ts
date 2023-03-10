import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './views/header/header.module';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { CartReducer } from './shared/store/cart/reducers/cart.reducer';
import { ProductsReducer } from './shared/store/products/reducers/products.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './../app/shared/store/products/effects/products.effects';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HeaderModule,
    StoreModule.forRoot({
      cart: CartReducer,
      products: ProductsReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !environment.production,
      autoPause: true,
    }),
    EffectsModule,
    EffectsModule.forRoot([ProductsEffects]),
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
