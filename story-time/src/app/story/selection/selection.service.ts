import { Injectable } from '@angular/core';
import { Story, IStory } from 'src/app/shared/story';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  /**
   * @summary List of all stored stories
   */
  // tslint:disable-next-line: variable-name
  private _stories = new Array<Story>();

  constructor() { }

  /**
   * @summary Getter for the list of all stories
   */
  get stories(): Array<Story> { return this._stories; }

  /**
   * @summary Import several files
   *
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
    };

    // Load provided files
    Array.from(files).forEach(file => {
      reader.readAsText(file);
    });
  }

}
