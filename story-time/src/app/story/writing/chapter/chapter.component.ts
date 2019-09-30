import { Component, Input, OnInit } from '@angular/core';
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
   * @summary Chapter's initial data
   */
  @Input()
  public chapterData: Chapter;

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

}
