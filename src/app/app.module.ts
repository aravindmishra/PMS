import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    MedicineDetailsFormComponent,
    MedicineDetailsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig], multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
