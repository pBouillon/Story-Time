import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorPagesModule } from './error-pages/error-pages.module';
import { FooterComponent } from './footer/footer.component';
import { MenuModule } from './menu/menu.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenuModule,
    ErrorPagesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
