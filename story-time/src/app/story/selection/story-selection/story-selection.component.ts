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

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IStoryMeta } from 'src/app/shared/story-meta';

@Component({
  selector: 'app-story-selection',
  templateUrl: './story-selection.component.html',
  styleUrls: ['./story-selection.component.scss']
})
export class StorySelectionComponent {

  /**
   * @summary Uploaded story meta data
   */
  @Input()
  public storyMeta: IStoryMeta;

  /**
   * @summary Emitter for play request
   */
  @Output()
  public playRequested = new EventEmitter<string>();

  /**
   * @summary Emitter for remove request
   */
  @Output()
  public removeRequested = new EventEmitter<string>();

  /**
   * @summary Default constructor
   */
  public constructor() { }

  /**
   * @summary Emits the story's title on playing request
   */
  public askPlay(): void {
    this.playRequested.emit(this.storyMeta.title);
  }

  /**
   * @summary Emits the story's title on deletion request
   */
  public askRemove(): void {
    this.removeRequested.emit(this.storyMeta.title);
  }

}
