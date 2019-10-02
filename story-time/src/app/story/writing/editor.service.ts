import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { IStoryMeta } from '../../shared/story-meta';
import { Chapter } from 'src/app/shared/chapter';

/**
 * @summary The editor service provides a bunch of tool to write your own story
 */
@Injectable({
  providedIn: 'root',
})
export class EditorService {

  /**
   * @summary Extension of the exported story file
   */
  public EXTENSION_NAME = '.story';

  /**
   * @summary Key to access the "chapters" part of the story
   */
  private STORY_CHAPTERS_KEY = 'story-chapters';

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
   * @summary Clear all story writing related content stored
   */
  public clearAllStoryData(): void {
    this.clearCurrentStoryMeta();
    this.clearCurrentStoryChapters();
  }

  /**
   * @summary Clear the stored chapters
   */
  public clearCurrentStoryChapters(): void {
    const currentStoryChapters = this.storageService.get(this.STORY_CHAPTERS_KEY) || null;

    if (currentStoryChapters !== null) {
      localStorage.removeItem(this.STORY_CHAPTERS_KEY);
    }
  }

  /**
   * @summary Clear the stored StoryMeta object
   */
  public clearCurrentStoryMeta(): void {
    const currentStoryMeta = this.storageService.get(this.STORY_META_KEY) || null;

    if (currentStoryMeta !== null) {
      localStorage.removeItem(this.STORY_META_KEY);
    }
  }

  /**
   * @summary Fetch the stored chapters of a story
   * @returns An array of all those chapters if existing; null otherwise
   */
  public getCurrentStoryChapters(): Array<Chapter> {
    const currentStoryChapters = this.storageService.get(this.STORY_CHAPTERS_KEY) || null;

    return currentStoryChapters === null
      ? null
      : JSON.parse(currentStoryChapters) as Array<Chapter>;
  }

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
   * @summary Store all chapters of a story
   * @param chapters An array containing all chapters of the current story
   */
  public storeStoryChapters(chapters: Array<Chapter>): void {
    this.storageService.store(this.STORY_CHAPTERS_KEY, chapters);
  }

  /**
   * @summary Store the "meta" part of the story
   */
  public storeStoryMeta(data: IStoryMeta): void {
    this.storageService.store(this.STORY_META_KEY, data);
  }

}
