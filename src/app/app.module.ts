import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TestComponent } from './.test/test.component';
import { Dashboard } from './shared/dashboard';
import { BaseModule } from './base/base.module';

@NgModule({
    declarations: [
        AppComponent,
        TestComponent,
    ],
    providers: [Dashboard],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BaseModule
    ]
})
export class AppModule { }

