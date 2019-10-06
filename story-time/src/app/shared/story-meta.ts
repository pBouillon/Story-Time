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

/**
 * @summary Wrapper for the story "meta" data
 */
export interface IStoryMeta {

  /**
   * @param author The story's author
   */
  author: string;

  /**
   * @param overview The story's description
   */
  overview: string;

  /**
   * @param tags The story's tags
   */
  tags: Array<string>;

  /**
   * @param title The story's title
   */
  title: string;

}

/**
 * @summary Concrete implementation of the wrapper for the story "meta" data
 */
export class StoryMeta implements IStoryMeta {

  /**
   * @summary Default constructor
   * @param author The story's author
   * @param overview The story's description
   * @param tags The story's tags
   * @param title The story's title
   */
  constructor(
    public author: string,
    public overview: string,
    public tags: Array<string>,
    public title: string,
  ) { }

}
