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
