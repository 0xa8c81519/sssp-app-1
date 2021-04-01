import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLibModule } from 'app-lib';
import { MenuItemComponent } from './menu-item/menu-item.component';

@NgModule({
    declarations: [
        AppComponent,
        MenuItemComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AppLibModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
