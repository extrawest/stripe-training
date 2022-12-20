import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher/theme-switcher.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { HeaderCartComponent } from './components/header-cart/header-cart/header-cart.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzElementPatchModule } from 'ng-zorro-antd/core/element-patch';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
  },
];

@NgModule({
  declarations: [HeaderComponent, ThemeSwitcherComponent, HeaderCartComponent],
  imports: [
    CommonModule,
    NzSwitchModule,
    FormsModule,
    RouterModule.forChild(routes),
    NzPageHeaderModule,
    NzIconModule,
    NzSpaceModule,
    NzMenuModule,
    NzGridModule,
    NzDividerModule,
    NzToolTipModule,
    NzElementPatchModule,
    NzBadgeModule,
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {}
