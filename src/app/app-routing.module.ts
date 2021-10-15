import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MedicineDetailsFormComponent } from './components/medicine/medicine-details-form/medicine-details-form.component';
import { MedicineDetailsListComponent } from './components/medicine/medicine-details-list/medicine-details-list.component';
const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent
  },
  {
    path:'medicine/list',
    component:MedicineDetailsListComponent
  },
  {
    path:'medicine/form',
    component:MedicineDetailsFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
