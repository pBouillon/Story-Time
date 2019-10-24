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
   * @summary Allowed tries per chapters
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
   * @summary Current remaining tries for answer's submission for the current chapter
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
   * @summary Getter for chapter success's status
   * @returns True if the user does't have any remaining try; false otherwise
   */
  public get isChapterFailed(): boolean { return this.currentRemainingTries <= 0; }

/**
 * @summary Getter for story success's status
 * @returns True if the user made it beyond the last chapter; false otherwise
 */
  public get isStoryFinished(): boolean { return this.currentChapterIndex === this.chapters.length; }

  /**
   * @summary Getter for the user's remaing tries
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
   * @summary Reset the parameters to prepare a new game
   */
  public startNewGame(): void {
    this.currentRemainingTries = this.ALLOWED_TRIES;
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
   * @summary Submit an answer for the current chapter
   *          Updates the remaining tries of the user
   * @param answer Provided answer
   * @returns True if the provided story is valid; false otherwise
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
