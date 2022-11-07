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

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
  },
];

@NgModule({
  declarations: [
    HeaderComponent,
    ThemeSwitcherComponent
  ],
  imports: [
    CommonModule,
    NzSwitchModule,
    FormsModule,
    RouterModule.forChild(routes),
    NzPageHeaderModule,
    NzIconModule,
    NzSpaceModule,
    NzMenuModule,
    NzGridModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
