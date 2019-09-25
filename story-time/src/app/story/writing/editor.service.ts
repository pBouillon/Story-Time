import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { IStoryMeta } from '../../shared/story-meta';

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
   * @summary Fetch the stored StoryMeta object
   * @returns The StoryMeta object if existing; null otherwise
   */
  public getCurrentStoryMeta(): IStoryMeta {
    const currentStoryMeta = this.storageService.get(this.STORY_META_KEY) || null;

    return currentStoryMeta === null
      ? null
      : JSON.parse(currentStoryMeta) as IStoryMeta;
  }

  /**
   * @summary Store the "meta" part of the story
   */
  public storeStoryMeta(data: IStoryMeta): void {
    this.storageService.store(this.STORY_META_KEY, data);
  }

}
