import { Injectable } from '@angular/core';
import { Story, IStory } from 'src/app/shared/story';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  /**
   * @summary List of all stored stories
   */
  // tslint:disable-next-line: variable-name
  private _stories = new Array<Story>();

  /**
   * @summary Key for all stored stories in the LocalStorage
   */
  private CACHED_STORIES_KEY = 'cached-stories';

  /**
   * @summary Default constructor
   * @param storageService Storage service to cache data
   */
  constructor(
    private storageService: StorageService,
  ) { }

  /**
   * @summary Getter for the list of all stories
   */
  get stories(): Array<Story> { return this._stories; }

  /**
   * @summary Delete all uploaded stories
   */
  public clearStories(): void {
    this._stories = [];
  }

  /**
   * @summary Import several files
   * @files FileList of files to import
   */
  public importFiles(files: FileList): void {
    // Initialize the file handler
    const reader = new FileReader();

    // Initialise story buffer
    let parsedStory: IStory;

    // Set callback on reader
    reader.onload = (event: ProgressEvent) => {
      // Extract file content
      const jsonContent = JSON.parse(reader.result as string);

      // Extract story parts (meta and content)
      parsedStory = jsonContent as IStory;

      // Add it to the known stories
      this._stories.push(parsedStory);

      // Store it in the cache
      this.saveStory(parsedStory);
    };

    // Load provided files
    Array.from(files).forEach(file => {
      reader.readAsText(file);
    });
  }

  /**
   * @summary Fetch the cached stories and fill the story list
   */
  public retrieveCachedStories(): void {
    // Fetch the stories currently stored
    const rawStoredStories = this.storageService.get(this.CACHED_STORIES_KEY);

    // Load the cached stories
    // or a new empty array if no story where stored
    this._stories = rawStoredStories === null
      ? new Array<IStory>()
      : JSON.parse(rawStoredStories) as Array<IStory>;
  }

  /**
   * @summary Save a story in the LocalStorage
   * @param story story to save
   */
  private saveStory(story: IStory): void {
    // Fetch the stories currently stored
    const rawStoredStories = this.storageService.get(this.CACHED_STORIES_KEY);

    // Format the LocalStorage data in an `IStory` array
    let storedStories: Array<IStory>;

    if (rawStoredStories !== null) {
      storedStories = JSON.parse(rawStoredStories) as Array<IStory>;
    } else {
      storedStories = new Array<IStory>();
    }

    // Append the story to cache
    storedStories.push(story);

    // Save the new cache
    this.storageService.store(this.CACHED_STORIES_KEY, storedStories);
  }

}
