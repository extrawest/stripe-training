import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CancelComponent } from './components/cancel/cancel.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

const routes: Routes = [
  {
    path: '',
    component: CancelComponent,
  },
];

@NgModule({
  declarations: [
    CancelComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzIconModule,
    NzButtonModule
  ]
})
export class CancelModule { }
