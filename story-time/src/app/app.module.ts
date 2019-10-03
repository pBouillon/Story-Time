import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorPagesModule } from './error-pages/error-pages.module';
import { FooterComponent } from './footer/footer.component';
import { MenuModule } from './menu/menu.module';
import { StoryModule } from './story/story.module';
import { TagInputModule } from 'ngx-chips';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    // ANGULAR
    TagInputModule,
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,

    // TOASTR
    ToastrModule.forRoot({
      progressBar: true,
      maxOpened: 3,
      preventDuplicates: true,
      resetTimeoutOnDuplicate: true,
    }),

    // UTILITIES
    FormsModule,
    ReactiveFormsModule,

    // CUSTOM
    ErrorPagesModule,
    MenuModule,
    StoryModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
