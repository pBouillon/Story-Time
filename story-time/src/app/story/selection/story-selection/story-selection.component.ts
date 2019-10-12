import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IStoryMeta } from 'src/app/shared/story-meta';

@Component({
  selector: 'app-story-selection',
  templateUrl: './story-selection.component.html',
  styleUrls: ['./story-selection.component.scss']
})
export class StorySelectionComponent implements OnInit {

  /**
   * @summary Uploaded story meta data
   */
  @Input()
  public storyMeta: IStoryMeta;

  /**
   * @summary Emitter for action request
   */
  @Output()
  public removeRequested = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  /**
   * @summary Emits the story's title on deletion request
   */
  askRemove(): void {
    this.removeRequested.emit(this.storyMeta.title);
  }

}
