import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionComponent } from './selection.component';
import { StorySelectionComponent } from './story-selection/story-selection.component';
import { SelectionService } from './selection.service';
import { WritingModule } from '../writing/writing.module';
import { PlayingModule } from '../playing/playing.module';

@NgModule({
  declarations: [
    SelectionComponent,
    StorySelectionComponent,
  ],
  imports: [
    CommonModule,
    PlayingModule,
  ],
  providers: [
    SelectionService,
  ],
})
export class SelectionModule { }
