import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chapter } from 'src/app/shared/chapter';

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
   * @summary Constant code to ask for another chapter after this one
   */
  public readonly AFTER = 1;

  /**
   * @summary Constant code to ask for another chapter before this one
   */
  public readonly BEFORE = -1;

  /**
   * @summary Constant code to ask for the item to be removed
   */
  public readonly REMOVE = 0;

  /**
   * @summary Chapter's initial data
   */
  @Input()
  public chapterData: Chapter;

  /**
   * @summary Emitter for the chapters order
   */
  @Output()
  public requestedAction: EventEmitter<number>;

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

  ngOnInit() {
    this.requestedAction = new EventEmitter<number>();
  }

  /**
   * @todo doc
   */
  public askAfter(): void {
    return this.requestedAction.emit(this.BEFORE);
  }

  /**
   * @todo doc
   */
  public askBefore(): void {
    return this.requestedAction.emit(this.BEFORE);
  }

  /**
   * @todo doc
   */
  public askRemove(): void {
    return this.requestedAction.emit(this.REMOVE);
  }

}
