import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent} from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then((mod) => mod.DashboardModule)
      },
      {
        path: 'unit',
        loadChildren: () => import('./inventory/unit/unit.module').then((mod) => mod.UnitModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./inventory/product/product.module').then((mod) => mod.ProductModule)
      },
      {
        path: 'tax',
        loadChildren: () => import('./inventory/tax/tax.module').then((mod) => mod.TaxModule)
      },
      {
        path: 'category',
        loadChildren: () => import('./inventory/category/category.module').then((mod) => mod.CategoryModule)
      },
      {
        path: 'invoice',
        loadChildren: () => import('./inventory/invoice/invoice.module').then((mod) => mod.InvoiceModule)
      },
      {
        path: 'revenue',
        loadChildren: () => import('./inventory/revenue/revenue.module').then((mod) => mod.RevenueModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('./inventory/customer/customer.module').then((mod) => mod.CustomerModule)
      },
      {
        path: 'bill',
        loadChildren: () => import('./inventory/bill/bill.module').then((mod) => mod.BillModule)
      },
      {
        path: 'payment',
        loadChildren: () => import('./inventory/payment/payment.module').then((mod) => mod.PaymentModule)
      },
      {
        path: 'vendor',
        loadChildren: () => import('./inventory/vendor/vendor.module').then((mod) => mod.VendorModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },

      {
        path: 'bank',
        loadChildren: () => import('./inventory/bank/bank.module').then((mod) => mod.BankModule)
      },

      {
        path: 'transfer',
        loadChildren: () => import('./inventory/transfer/transfer.module').then((mod) => mod.TransferModule)
      },
      {
        path: 'transaction',
        loadChildren: () => import('./inventory/transaction/transaction.module').then((mod) => mod.TransactionModule)
      },


    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class MainRoutingModule { }
