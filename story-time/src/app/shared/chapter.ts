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
   * @summary Message to display when the user fails on this chapter
   */
  messageFailure: string;

}

/**
 * @summary Concrete implementation of the wrapper for the "chapter" data
 */
export class Chapter implements IChapter {

  /**
   * @summary Default constructor, all fields are blank by default
   * @param content Chapter' content
   * @param expectedWord Expected word or expression to move on the next chapter
   * @param messageFailure Message to display when the user fails on this chapter
   */
  constructor(
    public content: string = '',
    public expectedWord: string = '',
    public messageFailure: string = ''
  ) { }

}
