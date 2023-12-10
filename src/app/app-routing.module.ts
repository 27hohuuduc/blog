import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthActivave, ConverterActivate } from './shared';
import { LoginComponent } from './path/login/login.component';
import { DashboardComponent } from './path/dashboard/dashboard.component';
import { TestComponent } from './.test/test.component';
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