import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './path/login/login.component';
import { DashboardComponent } from './path/dashboard/dashboard.component';
import { ConverterActivate } from './.modules/active-router/urlconverter';
import { TestComponent } from './.test/test.component';
import { AuthActivave } from './.modules/active-router/auth';
import { NotFoundComponent } from 'src/app/base/not-found/not-found.component';

const routes: Routes = [
  { path: "", canActivate: [ConverterActivate], component: TestComponent },
  { path: "login", component: LoginComponent },
  {
    path: "dashboard", canActivateChild: [AuthActivave], data: { isAdmin: true }, children: [
      { path: "", component: DashboardComponent }
    ]
  },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }