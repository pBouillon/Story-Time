import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfosComponent } from './infos/infos.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ContentComponent } from './content/content.component';
import { ChapterComponent } from './chapter/chapter.component';
import { ExportComponent } from './export/export.component';
import { TagInputModule } from 'ngx-chips';

@NgModule({
  declarations: [
    InfosComponent,
    ContentComponent,
    ChapterComponent,
    ExportComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TagInputModule,
  ]
})
export class WritingModule { }
