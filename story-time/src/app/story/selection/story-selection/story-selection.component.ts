import { Component, Input, OnInit } from '@angular/core';
import { IStoryMeta } from 'src/app/shared/story-meta';

@Component({
  selector: 'app-story-selection',
  templateUrl: './story-selection.component.html',
  styleUrls: ['./story-selection.component.scss']
})
export class StorySelectionComponent implements OnInit {

  @Input()
  public storyMeta: IStoryMeta;

  constructor() { }

  ngOnInit() {}

}
