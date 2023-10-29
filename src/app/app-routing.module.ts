import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/admin/login/login.component';
import { DashboardComponent } from './component/admin/dashboard/dashboard.component';
import { ConverterActivate } from './modules/lightmodule/urlconverter';

const routes: Routes = [
  {path: "", canActivate: [ConverterActivate], component: LoginComponent},
  {path: "admin", children: [
    {path: "", component: LoginComponent, canActivateChild: []},
    {path: "dashboard", component: DashboardComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }