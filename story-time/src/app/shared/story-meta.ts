/**
 * @summary Wrapper for the story "meta" data
 */
export interface IStoryMeta {

  /**
   * @summary The story's author
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
