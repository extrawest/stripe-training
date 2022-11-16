import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessComponent } from './components/success/success.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { RouterModule, Routes } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

const routes: Routes = [
  {
    path: '',
    component: SuccessComponent,
  },
];

@NgModule({
  declarations: [
    SuccessComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzCardModule,
    NzIconModule,
    NzButtonModule
  ]
})
export class SuccessModule { }
