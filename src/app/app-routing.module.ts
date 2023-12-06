import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/admin/login/login.component';
import { DashboardComponent } from './component/admin/dashboard/dashboard.component';
import { ConverterActivate } from './modules/active-router/urlconverter';
import { TestComponent } from './component/test/test.component';
import { AuthActivave } from './modules/active-router/auth';
import { NotFoundComponent } from './component/not-found/not-found.component';

const routes: Routes = [
  { path: "", canActivate: [ConverterActivate], component: TestComponent },
  {
    path: "admin", canActivateChild: [AuthActivave], children: [
      { path: "", component: LoginComponent },
      { path: "dashboard", component: DashboardComponent, data: {isAdmin: true}}
    ]
  },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }