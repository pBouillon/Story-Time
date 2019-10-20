import { Component, Input } from '@angular/core';
import { IStory } from 'src/app/shared/story';

@Component({
  selector: 'app-playing',
  templateUrl: './playing.component.html',
  styleUrls: ['./playing.component.scss']
})
export class PlayingComponent {

  /**
   * @summary User's selected story
   */
  @Input()
  public playedStory: IStory;

  constructor() { }

}
