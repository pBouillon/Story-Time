import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayingComponent } from './playing.component';
import { PlayingService } from './playing.service';

@NgModule({
  declarations: [
    PlayingComponent,
  ],
  exports: [
    PlayingComponent,
  ],
  imports: [
    CommonModule
  ],
  providers: [
    PlayingService,
  ],
})
export class PlayingModule { }
