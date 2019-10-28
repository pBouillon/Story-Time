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

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppRoutes } from 'src/app/app-routing.module';
import { IStory } from 'src/app/shared/story';
import { SelectionService } from './selection.service';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {

  public displayedStories: Array<IStory>;

  /**
   * Default constructor
   * @param router Router to redirect the user to the requested pages
   * @param snackBar Toolbox for snackbar displays
   * @param selectionService Toolbox for the selection menu's operations
   * @param toastrService Toastr toolbox for alert messages
   */
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    public selectionService: SelectionService,
    public toastrService: ToastrService,
  ) { }

  /**
   * @summary Initialize the component
   */
  ngOnInit() {
    // Fetch the cached stories
    this.selectionService.retrieveCachedStories();

    // Fill displayed stories
    this.displayedStories = this.selectionService.stories;
  }

  /**
   * @summary Play the story emitting the event
   * @param event The story's title
   */
  public playRequestedStory(event: string): void {
    const storyTitle = event;

    // Handle action
    try {
      this.selectionService.playStoryByTitle(storyTitle);
    } catch (error) {
      this.toastrService.error(
        `Aucune histoire intitulée "${storyTitle}"`,
        'Impossible de lire cette histoire'
      );
    }
  }

  /**
   * @summary Remove the listed story requesting its deletion
   * @param event The story's title
   */
  public removeRequestedStory(event: string): void {
    const storyTitle = event;

    // Handle action
    try {
      this.selectionService.removeStoryByTitle(storyTitle);

      // User notification
      this.snackBar.open('🎊 Histoire supprimée !', 'Fermer');

    } catch (error) {
      this.toastrService.error(
        `Aucune histoire intitulée "${storyTitle}"`,
        'Impossible de supprimer cette histoire'
      );
    }
  }

  /**
   * @summary import new stories
   * @param event Event thrown on file drop
   */
  public onChange(event: EventTarget): void {
    // Extract relevant data from the event
    const eventObj = event as MSInputMethodContext;
    const target = eventObj.target as HTMLInputElement;

    // Extract uploaded files
    this.selectionService.importFiles(target.files);

    // User notification
    this.snackBar.open('🎊 Histoire importée !', 'Fermer');
  }

  /**
   * @summary Remove all stored stories
   */
  public onClear(): void {
    // Request all stories clearing
    this.selectionService.clearStories();

    // Refresh displayed stories
    this.displayedStories = this.selectionService.stories;

    // User notification
    this.snackBar.open('🎊 Histoire(s) supprimée(s) !', 'Fermer');
  }

  /**
   * @summary Redirect the user to the main menu
   */
  public onMenu(): void {
    this.router.navigate([`${AppRoutes.Index}`]);
  }

  /**
   * @summary Leave the current game and redirect the user to the selection menu
   */
  public onSelectionMenu(): void {
    // Clear user's playing status
    this.selectionService.setUserSelecting();
  }

  /**
   * @summary Search for a specific story
   * @param filter Text searched (case insensitive)
   */
  public onStorySearching(filter: string): void {
    // On an empty filter, display all stories
    // Otherwise, apply the given filter
    filter === ''
      ? this.displayedStories = this.selectionService.stories
      : this.displayedStories = this.selectionService.filteredStories(filter);
  }

}
