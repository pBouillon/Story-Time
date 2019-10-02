import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chapter, ChapterAction } from 'src/app/shared/chapter';

/**
 * @summary Component to display and update chapter's data on creation
 */
@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss']
})
export class ChapterComponent implements OnInit {

  /**
   * @summary Chapter's initial data
   */
  @Input()
  public chapterData: Chapter;

  /**
   * @summary Emitter for the chapters order
   */
  @Output()
  public requestedAction = new EventEmitter<[number, number]>();

  /**
   * @summary Getter and setter for the chapter's content
   */
  get content(): string { return this.chapterData.content; }
  set content(content: string) { this.chapterData.content = content; }

  /**
   * @summary Getter and setter for the chapter's expected word
   */
  get expectedWord(): string { return this.chapterData.expectedWord; }
  set expectedWord(expected: string) { this.chapterData.expectedWord = expected; }

  /**
   * @summary Getter and setter for the chapter's failure message
   */
  get messageFailure(): string { return this.chapterData.expectedWord; }
  set messageFailure(messageFailure: string) { this.chapterData.messageFailure = messageFailure; }

  constructor() { }

  ngOnInit() { }

  /**
   * @summary Request the creation of a new component after this one
   */
  public askAfter(): void {
    return this.requestedAction.emit([ChapterAction.AFTER, this.chapterData.id]);
  }

  /**
   * @summary Request the creation of a new component before this one
   */
  public askBefore(): void {
    return this.requestedAction.emit([ChapterAction.BEFORE, this.chapterData.id]);
  }

  /**
   * @summary Request this component to be removed
   */
  public askRemove(): void {
    return this.requestedAction.emit([ChapterAction.REMOVE, this.chapterData.id]);
  }

}
