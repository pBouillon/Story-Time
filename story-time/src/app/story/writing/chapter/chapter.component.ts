/**
 * MIT License
 *
 * Copyright © 2019 ADAM Timothée, BOUILLON Pierre, VARNIER Victor
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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
