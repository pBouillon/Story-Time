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

import { Injectable } from '@angular/core';
import { IChapter } from 'src/app/shared/chapter';
import { IStory } from 'src/app/shared/story';

/**
 * @summary Logic to play a story
 */
@Injectable({
  providedIn: 'root'
})
export class PlayingService {

  /**
   * @todo doc
   */
  private readonly ALLOWED_TRIES = 2;

  /**
   * @summary Currently played story
   */
  public playedStory: IStory;

  /**
   * @summary Index of the chapter currently played
   */
  private currentChapterIndex: number;

  /**
   * @todo doc
   */
  private currentRemainingTries: number;

  /**
   * @summary Getter for the chapter currently played
   */
  public get currentChapter(): IChapter { return this.chapters[this.currentChapterIndex]; }

  /**
   * @summary Array of the chapters contained in the story
   */
  public get chapters(): Array<IChapter> { return this.playedStory.story; }

  /**
   * @todo doc
   */
  public get isChapterFailed(): boolean { return this.currentRemainingTries <= 0; }

  /**
   * @todo doc
   */
  public get isStoryFinished(): boolean { return this.currentChapterIndex === this.chapters.length; }

  /**
   * @todo doc
   */
  public get remainingTries(): number { return this.currentRemainingTries; }

  /**
   * @summary Initialize the inner-counted for chapters record
   */
  constructor() {
    this.currentRemainingTries = this.ALLOWED_TRIES;
    this.currentChapterIndex = -1;
  }

  /**
   * @todo doc
   */
  public startNewGame(): void {
    this.currentChapterIndex = 0;
  }

  /**
   * @summary Move on to the next chapter
   */
  public playNextChapter(): void {
    // Move to the next chapter
    if (!this.isStoryFinished) {
      ++this.currentChapterIndex;
    }
  }

  /**
   * @todo doc
   * @param answer
   */
  public tryValidateCurrentChapter(answer: string): boolean {
    const isAnswerCorrect = this.currentChapter.expectedWord.toLowerCase() === answer.toLowerCase();

    if (isAnswerCorrect
        && this.currentRemainingTries > 0) {
      // Restore remaining tries
      this.currentRemainingTries = this.ALLOWED_TRIES;
      return true;
    }

    // Decrement remaining tries
    --this.currentRemainingTries;
    return false;
  }

}
