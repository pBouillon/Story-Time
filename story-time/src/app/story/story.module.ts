import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionComponent } from './selection/selection.component';
import { WritingModule } from './writing/writing.module';
import { EditorService } from './writing/editor.service';

@NgModule({
  declarations: [SelectionComponent],
  imports: [
    CommonModule,
    WritingModule,
  ],
  providers: [
    EditorService,
  ],
})
export class StoryModule { }
