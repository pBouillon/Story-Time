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
import { IStory } from 'src/app/shared/story';
import { IChapter } from 'src/app/shared/chapter';

/**
 * @summary Logic to play a story
 */
@Injectable({
  providedIn: 'root'
})
export class PlayingService {

  /**
   * @summary Currently played story
   */
  public playedStory: IStory;

  /**
   * @summary Index of the chapter currently played
   */
  private currentChapterIndex: number;

  /**
   * @summary Getter for the chapter currently played
   */
  public get currentChapter(): IChapter { return this.chapters[this.currentChapterIndex]; }

  /**
   * @summary Array of the chapters contained in the story
   */
  public get chapters(): Array<IChapter> { return this.playedStory.story; }

  /**
   * @summary Initialize the inner-counted for chapters record
   */
  constructor() {
    this.currentChapterIndex = -1;
  }

  /**
   * @summary Move on to the next chapter
   * @param answer User provided answer
   */
  public playNextChapter(answer: string): void {
    // Assert that this chapter is valid
    const isAnswerValid = this.currentChapter.validate(answer);

    if (!isAnswerValid) {
      // TODO: story failure
    }

    // Move to the next chapter
    if (++this.currentChapterIndex === this.chapters.length) {
      // TODO: success
    }
  }

}
