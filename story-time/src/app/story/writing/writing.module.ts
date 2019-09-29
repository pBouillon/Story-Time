import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfosComponent } from './infos/infos.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ContentComponent } from './content/content.component';
import { ChapterComponent } from './chapter/chapter.component';

@NgModule({
  declarations: [
    InfosComponent,
    ContentComponent,
    ChapterComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class WritingModule { }
