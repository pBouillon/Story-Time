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
import { DuplicatedStoryUploadedError } from 'src/app/errors/DuplicatedStoryUploadedError';
import { NoSuchStoryUploadedError } from 'src/app/errors/NoSuchStoryUploadedError';

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
    // Remove dynamically stored story
    this._stories = [];

    // Clear the local storage
    this.storageService.clear(this.CACHED_STORIES_KEY);
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

      // Check if the story exists
      if (this.getIndexByTitle(parsedStory.meta.title) !== -1) {
        throw new DuplicatedStoryUploadedError('This story has already been uploaded');
      }

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

}
