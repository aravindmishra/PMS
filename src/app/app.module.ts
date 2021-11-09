import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppConfig } from '../app/app.config';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/body/header/header.component';
import { SidebarComponent } from './components/body/sidebar/sidebar.component';
import { FooterComponent } from './components/body/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MedicineDetailsFormComponent } from './components/medicine/medicine-details-form/medicine-details-form.component';
import { MedicineDetailsListComponent } from './components/medicine/medicine-details-list/medicine-details-list.component';
import { BillFormComponent } from './components/bill/bill-form/bill-form.component';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { NgxNumToWordsModule } from 'ngx-num-to-words'; 
import { GenerateBillComponent } from './components/bill/generate-bill/generate-bill.component';
import { PurchaseHistotyComponent } from './components/medicine/purchase-histoty/purchase-histoty.component';
import { BillHistoryComponent } from './components/bill/bill-history/bill-history.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    MedicineDetailsFormComponent,
    MedicineDetailsListComponent,
    BillFormComponent,
    GenerateBillComponent,
    PurchaseHistotyComponent,
    BillHistoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    NgxPaginationModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
    NgxNumToWordsModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig], multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
