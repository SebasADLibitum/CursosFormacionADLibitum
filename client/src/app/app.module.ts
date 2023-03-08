import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AddTokenInterceptor } from './utils/add-token.interceptor';
import { ListTeachersComponent } from './components/list-teachers/list-teachers.component';
import { AddEditTeachersComponent } from './components/add-edit-teachers/add-edit-teachers.component';
import { ListCoursesComponent } from './components/list-courses/list-courses.component';
import { AddEditCoursesComponent } from './components/add-edit-courses/add-edit-courses.component';
import { ListRegisteredTeachersComponent } from './components/list-registered-teachers/list-registered-teachers.component';
import { ListTypesCoursesComponent } from './components/list-types-courses/list-types-courses.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderByPipe } from './pipes/order-by.pipe'; // Agrega la importación de OrderByPipe


import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { ModalCoursesComponent } from './components/modal-courses/modal-courses.component';

import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
import { jqxPanelModule } from 'jqwidgets-ng/jqxpanel';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NavbarComponent,
    SpinnerComponent,
    ListTeachersComponent,
    AddEditTeachersComponent,
    ListCoursesComponent,
    AddEditCoursesComponent,
    ListRegisteredTeachersComponent,
    ListTypesCoursesComponent,
    OrderByPipe,
    ModalCoursesComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    ShowHidePasswordModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    jqxGridModule, jqxButtonModule, jqxPanelModule

  ],
  providers: [
    UpperCasePipe, CurrencyPipe,
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
