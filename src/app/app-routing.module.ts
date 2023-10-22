import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/admin/login/login.component';
import { DashboardComponent } from './component/admin/dashboard/dashboard.component';

const routes: Routes = [
  {path: "admin", children: [
    {path: "", component: LoginComponent},
    {path: "dashboard", component: DashboardComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

