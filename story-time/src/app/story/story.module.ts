import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WritingComponent } from './writing/writing.component';
import { SelectionComponent } from './selection/selection.component';

@NgModule({
  declarations: [WritingComponent, SelectionComponent],
  imports: [
    CommonModule
  ]
})
export class StoryModule { }
