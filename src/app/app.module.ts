import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/admin/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './component/admin/dashboard/dashboard.component';
import { TreeViewComponent } from './component/core/tree-view/tree-view.component';
import { MenuBarComponent } from './component/base/menu-bar/menu-bar.component';
import { TestComponent } from './component/test/test.component';
import { LineComponent } from './component/core/editer/line/line.component';
import { EditorComponent } from './component/core/editer/editor.component';
import { ContextmenuComponent } from './component/core/contextmenu/contextmenu.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        TreeViewComponent,
        MenuBarComponent,
        TestComponent,
        LineComponent,
        EditorComponent,
        ContextmenuComponent
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

