import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListBillComponent } from './list-bill/list-bill.component';
import { CreateBillComponent } from './create-bill/create-bill.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',

    component: ListBillComponent
  },
  {
    path: 'create',
    pathMatch: 'full',
    component: CreateBillComponent
  },


];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class BillRoutingModule { }