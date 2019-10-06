/**
 * MIT License
 *
 * Copyright (c) 2019 ADAM Timothée, BOUILLON Pierre, VARNIER Victor
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

import { IStoryMeta } from './story-meta';
import { IChapter } from './chapter';

/**
 * @summary Wrapper for the story data
 */
export interface IStory {

  /**
   * @param meta the story "meta" data
   * @see IStoryMeta
   */
  meta: IStoryMeta;

  /**
   * @param story the story chapters as an array of chapters
   * @see IChapter
   */
  story: Array<IChapter>;

}

/**
 * @summary Concrete implementation of the IStory interface
 * @see IStory
 */
export class Story implements IStory {

  /**
   * @param meta the story "meta" data
   * @see IStoryMeta
   */
  meta: IStoryMeta;

  /**
   * @param story the story chapters as an array of chapters
   * @see IChapter
   */
  story: Array<IChapter>;

}
