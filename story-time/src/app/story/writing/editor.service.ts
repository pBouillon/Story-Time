import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { StoryModule } from '../story.module';

export interface IStoryMeta {
  author: string;
  overview: string;
  tags: Array<string>;
  title: string;
}

/**
 * @summary Wrapper for the story "meta" data
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


/**
 * @summary The editor service provides a bunch of tool to write your own story
 */
@Injectable({
  providedIn: 'root',
})
export class EditorService {

  /**
   * @summary Key to access the "meta" part of the story
   */
  private STORY_META_KEY = 'story-meta';

  /**
   * @summary Default constructor
   * @param storageService localStorage toolbox
   */
  constructor(
    private storageService: StorageService,
  ) { }

  /**
   * @todo doc
   */
  public getCurrentStoryMeta(): StoryMeta {
    const currentStoryMeta = this.storageService.get(this.STORY_META_KEY) || null;

    return currentStoryMeta === null
      ? null
      : JSON.parse(currentStoryMeta) as IStoryMeta;
  }

  /**
   * @summary Store the "meta" part of the story
   */
  public storeStoryMeta(data: StoryMeta): void {
    this.storageService.store(this.STORY_META_KEY, data);
  }

}
