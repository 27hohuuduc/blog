import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthActivave, ConverterActivate } from './shared';
import { TestComponent } from './.test/test.component';
import { NotFoundComponent } from 'src/app/base/not-found/not-found.component';
import { LoginComponent } from './base';

const routes: Routes = [
  { path: "", canActivate: [ConverterActivate], component: TestComponent },
  { path: "login", component: LoginComponent },
  {
    path: "dashboard", canActivateChild: [AuthActivave], data: { isAdmin: true },
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }