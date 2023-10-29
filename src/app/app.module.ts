import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/admin/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './component/admin/dashboard/dashboard.component';
import { TreeViewComponent } from './component/core/tree-view/tree-view.component';
import { MenuBarComponent } from './component/base/menu-bar/menu-bar.component';
import { EditerComponent } from './component/core/editer/editer.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        TreeViewComponent,
        MenuBarComponent,
        EditerComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ]
})
export class AppModule {
    
}

