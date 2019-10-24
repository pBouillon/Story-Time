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
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppRoutes } from 'src/app/app-routing.module';
import { Chapter, ChapterAction, IChapter } from 'src/app/shared/chapter';
import { LengthSpec } from 'src/app/shared/length-spec';
import { EditorService } from '../editor.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  /**
   * @summary Bounds for the number of chapters contained in a story
   */
  private readonly chaptersBounds = new LengthSpec(1, 15);

  /**
   * @summary Ordered list of all chapters
   */
  public chapters: Array<IChapter>;

  /**
   * Default constructor
   * @param editorService Editor toolbox
   * @param router Router to redirect the user to the requested pages
   * @param toastrService Toastr utilities to show messages
   */
  constructor(
    private editorService: EditorService,
    private router: Router,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
    // Clear any remaining data
    this.editorService.clearCurrentStoryChapters();

    // Initialize chapters
    this.initializeChapters();
  }

  /**
   * @summary Add a new chapter in the chapters list
   * @param position position in which the new chapter will be created
   */
  private addChapter(position: number = this.chapters.length): IChapter {
    // If the maximum number of chapters allowed is reached, does nothing
    if (this.chapters.length === this.chaptersBounds.max) {
      this.toastrService.warning(
        'Impossible d\'ajouter un chapitre',
        'Le nombre maximum de chapitre est déjà atteint.'
      );
      return;
    }

    // Add a new chapter at the given position
    this.chapters.splice(position, 0, new Chapter(this.chapters.length));
  }

  /**
   * @summary Handle the requested action from the child component
   * @param event A tuple containing the event request code and the component position
   */
  public handleRequestedAction(event: [number, number]): void {
    const [request, position] = event;

    // Handle action
    switch (request) {
      case ChapterAction.AFTER:
        this.addChapter(position + 1);
        break;

      case ChapterAction.BEFORE:
        this.addChapter(position);
        break;

      case ChapterAction.REMOVE:
        this.removeItem(position);
        break;

      default:
        this.toastrService.error(
          'Impossible d\'effectuer l\'action demandée',
          'Cette commande est inconnue.'
        );
        break;
    }

    // Re-evaluate indexes
    let counter = 0;
    this.chapters.map(chapter => chapter.id = counter++);
  }

  /**
   * @summary Initialize the chapter's array
   */
  private initializeChapters(): void {
    this.chapters = new Array<IChapter>();
    this.addChapter();
  }

  /**
   * @summary Assert that all chapters are valid
   * @returns `true` if all chapters are filled; `false` otherwise
   */
  public isContentValid(): boolean {
    let isContentValid = true;

    this.chapters.forEach(chapter => {
      if (chapter.content === ''
        || chapter.expectedWord === ''
        || chapter.messageFailure === ''
        || chapter.question === '') {
        isContentValid = false;
        return;
      }
    });

    return isContentValid;
  }

  /**
   * @summary Redirect the user back to the main menu
   */
  public onBack(): void {
    this.router.navigate([`${AppRoutes.Writing}/${AppRoutes.Infos}`]);
  }

  /**
   * @summary Reset the chapters writing view
   */
  public onReset(): void {
    this.initializeChapters();
  }

  /**
   * @summary Validate all values provided by the user and save them
   */
  public onSubmit(): void {
    // Validate all chapters
    if (!this.isContentValid()) {
      this.toastrService.warning(
        'Impossible d\'exporter cette histoire',
        'Certains champs sont incorrects.'
      );
      return;
    }

    // Save chapters
    this.editorService.storeStoryChapters(this.chapters);

    // Redirect the user to the export page
    this.router.navigate([`${AppRoutes.Writing}/${AppRoutes.Export}`]);
  }

  /**
   * @summary Remove an item at a given position
   * @param position Position of the item to delete
   */
  private removeItem(position: number): void {
    // If the minimum number of chapters allowed is reached, does nothing
    if (this.chapters.length === this.chaptersBounds.min) {
      this.toastrService.warning(
        'Impossible de supprimer un chapitre',
        'Le nombre minimal de chapitre est déjà atteint.'
      );
      return;
    }

    // Remove the chapter at the given position
    this.chapters.splice(position, 1);
  }

}
