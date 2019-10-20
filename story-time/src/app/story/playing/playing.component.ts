import { Component, Input, OnInit } from '@angular/core';
import { IStory } from 'src/app/shared/story';
import { PlayingService } from './playing.service';

@Component({
  selector: 'app-playing',
  templateUrl: './playing.component.html',
  styleUrls: ['./playing.component.scss']
})
export class PlayingComponent implements OnInit {

  /**
   * @summary User's selected story
   */
  @Input()
  public playedStory: IStory;

  /**
   * @summary Default constructor
   * @param playingService Playing service logic
   */
  constructor(
    public playingService: PlayingService,
  ) { }

  /**
   * @summary Initialize the component
   */
  ngOnInit() {
    // Set the provided story as the one to be played
    this.playingService.playedStory = this.playedStory;
  }
}
