import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorPagesModule } from './error-pages/error-pages.module';
import { FooterComponent } from './footer/footer.component';
import { MenuModule } from './menu/menu.module';
import { StoryModule } from './story/story.module';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorPagesModule,
    MenuModule,
    StoryModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
