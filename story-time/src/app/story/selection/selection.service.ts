/**
 * MIT License
 *
 * Copyright © 2019 ADAM Timothée, BOUILLON Pierre, VARNIER Victor
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

import { Injectable } from '@angular/core';
import { Story, IStory } from 'src/app/shared/story';
import { StorageService } from '../storage.service';
import { NoSuchStoryUploadedError } from 'src/app/errors/NoSuchStoryUploadedError';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  /**
   * @summary Checker to assert that the user is playing or not
   */
  // tslint:disable-next-line: variable-name
  private _isUserPlaying = false;

  /**
   * @summary Getter for the player's state
   */
  public get isUserPlaying(): boolean { return this._isUserPlaying; }

  /**
   * @summary User selected story to be played
   */
  // tslint:disable-next-line: variable-name
  private _selectedStory: IStory;

  /**
   * @summary Getter for the user's selected story
   */
  public get selectedStory(): IStory { return this._selectedStory; }

  /**
   * @summary List of all stored stories
   */
  // tslint:disable-next-line: variable-name
  private _stories = new Array<Story>();

  /**
   * @summary Getter for the list of all stories
   */
  public get stories(): Array<Story> { return this._stories; }

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
   * @summary Delete all uploaded stories
   */
  public clearStories(): void {
    // Remove dynamically stored story
    this._stories = [];

    // Clear the local storage
    this.storageService.clear(this.CACHED_STORIES_KEY);
  }

  /**
   * @summary Search for all stories regarding the given filter
   *          (case insensitive)
   * @param filter Filter to apply
   */
  public filteredStories(filter: string): Array<IStory> {
    // Set filter to lowercase to normalize it
    const normalizedFilter = filter.toLowerCase();

    // Create filtered story buffer
    const filteredStories = new Array<IStory>();

    // Parse stories
    for (const story of this.stories) {
      // Check for title matching
      if (story.meta.title.toLowerCase().indexOf(normalizedFilter) !== -1) {
        filteredStories.push(story);
        continue;
      }

      // Check for tag matching
      for (const tag of story.meta.tags) {
        if (tag.toLowerCase().indexOf(normalizedFilter) !== -1) {
          filteredStories.push(story);
          break;
        }
      }
    }

    // Return filtered stories buffer
    return filteredStories;
  }

  /**
   * @summary get the index of the story with a matching title among all stored stories
   * @param title Story's title
   * @returns The index of the story in the stored stories array; -1 if not found
   */
  private getIndexByTitle(title: string): number {
    let index = -1;
    let counter = -1;

    this._stories.forEach((uploaded: Story) => {
      ++counter;
      if (uploaded.meta.title === title) {
        index = counter;
        return;
      }
    });

    return index;
  }

  /**
   * @summary Import several files
   * @files FileList of files to import
   * @throws `DuplicatedStoryUploadedError` on reupload of a tracked story
   */
  public importFiles(files: FileList): void {
    // Initialize the file handler
    const reader = new FileReader();

    // Initialise story buffer
    let parsedStory: IStory;

    // Set callback on reader
    reader.onload = (_: ProgressEvent) => {
      // Extract file content
      const jsonContent = JSON.parse(reader.result as string);

      // Extract story parts (meta and content)
      parsedStory = jsonContent as IStory;

      // Count occurrences of the same file
      // Hack: make it more precise
      const re = new RegExp(`^${parsedStory.meta.title}.*$`, 'g');

      let occurrences = 0;
      this.stories.forEach(story => {
        if (story.meta.title.match(re)) {
          ++occurrences;
        }
      });

      // Append the number of occurrences if any duplicate is found
      if (occurrences !== 0) {
        parsedStory.meta.title += ` (${occurrences})`;
      }

      // Add it to the known stories
      this._stories.push(parsedStory);
      this.sortStories();

      // Store it in the cache
      this.saveStory(parsedStory);
    };

    reader.onerror = (event: ProgressEvent) => {
      reader.abort();
    };

    // Load provided files
    Array.from(files).forEach(file => {
      reader.readAsText(file);
    });
  }

  /**
   * @todo
   * @summary Play a story from its title
   * @param title Title of the story to play
   * @throws `Error` if no matching story were found
   */
  public playStoryByTitle(title: string): void {
    // Get the index of the element to play
    const index = this.getIndexByTitle(title);

    // Detect error
    if (index === -1) {
      throw new NoSuchStoryUploadedError('Unknown story');
    }

    // Toggle player's status
    this.setUserPlaying();

    // Assign this story
    this._selectedStory = this.stories[index];
  }

  /**
   * @summary Remove a story from its title
   * @param title Title of the story to remove
   * @throws `Error` if no matching story were found
   */
  public removeStoryByTitle(title: string): void {
    // Get the index of the element to remove
    const index = this.getIndexByTitle(title);

    // Detect error
    if (index === -1) {
      throw new NoSuchStoryUploadedError('Unknown story');
    }

    // Remove item
    this._stories.splice(index, 1);

    // Refresh the cache
    this.storageService.clear(this.CACHED_STORIES_KEY);
    this.storageService.store(this.CACHED_STORIES_KEY, this.stories);
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

    this.sortStories();
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
    this.storageService.store(this.CACHED_STORIES_KEY, this.stories);
  }

  /**
   * @summary Toggle the user status to playing
   */
  private setUserPlaying(): void {
    this._isUserPlaying = true;
  }

  /**
   * @summary Toggle the user status to not playing and reset its selection
   */
  public setUserSelecting(): void {
    this._isUserPlaying = false;

    // Reset user's selected story
    this._selectedStory = null;
  }

  /**
   * @summary Sort all stories by title
   */
  private sortStories(): void {
    // Sort the stories
    this._stories = this.stories.sort((s1: Story, s2: Story) => {
      let rc: number;

      const title1 = s1.meta.title.toLowerCase();
      const title2 = s2.meta.title.toLowerCase();

      if (title1 > title2) {
        rc = 1;
      } else if (title2 > title1) {
        rc = -1;
      } else {
        rc = 0;
      }

      return rc;
    });
  }

}
