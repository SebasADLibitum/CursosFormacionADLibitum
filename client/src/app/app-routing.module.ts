import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './utils/auth.guard';
import { ListTeachersComponent } from './components/list-teachers/list-teachers.component';
import { ListCoursesComponent } from './components/list-courses/list-courses.component';
import { ListRegisteredTeachersComponent } from './components/list-registered-teachers/list-registered-teachers.component';
import { ListTypesCoursesComponent } from './components/list-types-courses/list-types-courses.component';
import { AddEditCoursesComponent } from './components/add-edit-courses/add-edit-courses.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'teachers', component: ListTeachersComponent },
  { path: 'courses', component: ListCoursesComponent },
  { path: 'editCourse', component: AddEditCoursesComponent },
  { path: 'registered-teachers', component: ListRegisteredTeachersComponent },
  { path: 'types-courses', component: ListTypesCoursesComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
