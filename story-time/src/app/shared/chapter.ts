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
 * @summary Wrapper for the "chapter" data
 */
export interface IChapter {

  /**
   * @summary Chapter's content
   */
  content: string;

  /**
   * @summary Word expected to validate this chapter
   */
  expectedWord: string;

  /**
   * @summary Id containing the chapter's order in the story
   */
  id: number;

  /**
   * @summary Message to display when the user fails on this chapter
   */
  messageFailure: string;

  /**
   * @summary Question to ask after the chapter's content
   */
  question: string;

}

/**
 * @summary Concrete implementation of the wrapper for the "chapter" data
 */
export class Chapter implements IChapter {

  /**
   * @summary Default constructor, all fields are blank by default
   * @param id Chapter order
   * @param content Chapter's content
   * @param expectedWord Expected word or expression to move on the next chapter
   * @param messageFailure Message to display when the user fails on this chapter
   * @param question Question to ask after the chapter's content
   */
  constructor(
    public id: number = 0,
    public content: string = '',
    public expectedWord: string = '',
    public messageFailure: string = '',
    public question: string = ''
  ) { }

}

export enum ChapterAction {
  /**
   * @summary Constant code to ask for another chapter after this one
   */
  AFTER = 1,

  /**
   * @summary Constant code to ask for another chapter before this one
   */
  BEFORE = -1,

  /**
   * @summary Constant code to ask for the item to be removed
   */
  REMOVE = 0,
}
