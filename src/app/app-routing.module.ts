import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MedicineDetailsFormComponent } from './components/medicine/medicine-details-form/medicine-details-form.component';
import { MedicineDetailsListComponent } from './components/medicine/medicine-details-list/medicine-details-list.component';
import { BillFormComponent } from './components/bill/bill-form/bill-form.component';
import { MedicineFormGuard } from './core/guard/medicine-form.guard';
import { PurchaseHistotyComponent } from './components/medicine/purchase-histoty/purchase-histoty.component';
import { BillHistoryComponent } from './components/bill/bill-history/bill-history.component';
import { CommonGuard } from './core/guard/common.guard';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent,
    canActivate:[CommonGuard]
  },   
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[CommonGuard]
  },
  {
    path:'bill/form',
    component:BillFormComponent,
    canActivate:[CommonGuard]
  },
  {
    path:'bill/history',
    component:BillHistoryComponent,
    canActivate:[CommonGuard]
  },
  {
    path:'medicine/list',
    component:MedicineDetailsListComponent,
    canActivate:[CommonGuard]
  },
  {
    path:'medicine/form',
    component:MedicineDetailsFormComponent,
    canActivate:[CommonGuard],
    canDeactivate: [MedicineFormGuard]
  },
  {
    path:'medicine/purchase_history',
    component:PurchaseHistotyComponent,
    canActivate:[CommonGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
