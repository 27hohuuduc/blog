import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './path/login/login.component';
import { DashboardComponent } from './path/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { TreeViewComponent } from './core/tree-view/tree-view.component';
import { MenuBarComponent } from './base/menu-bar/menu-bar.component';
import { TestComponent } from './.test/test.component';
import { LineComponent } from './core/editer/line/line.component';
import { EditorComponent } from './core/editer/editor.component';
import { ContextmenuComponent } from './base/contextmenu/contextmenu.component';
import { Dashboard } from './.modules/dashboard';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        MenuBarComponent,
        TestComponent,
        LineComponent,
        EditorComponent,
    ],
    providers: [Dashboard],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ContextmenuComponent,
        TreeViewComponent
    ]
})
export class AppModule {
    
}

