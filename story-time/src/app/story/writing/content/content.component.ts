import { Component, OnInit } from '@angular/core';
import { EditorService } from '../editor.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/app-routing.module';
import { IChapter, Chapter, ChapterAction } from 'src/app/shared/chapter';
import { LengthSpec } from 'src/app/shared/length-spec';
import { all } from 'q';

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
   * @param formBuilder FormBuilder object to gather story's details
   * @param router Router to redirect the user to the requested pages
   */
  constructor(
    private editorService: EditorService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.chapters = new Array<IChapter>();
    this.addChapter();
  }

  /**
   * @summary Add a new chapter in the chapters list
   * @param position position in which the new chapter will be created
   */
  private addChapter(position: number = this.chapters.length): IChapter {
    // If the maximum number of chapters allowed is reached, does nothing
    if (this.chapters.length === this.chaptersBounds.max) {
      // TODO: error notification
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
        // TODO: error message on notification (planned later)
        break;
    }

    // Re-evaluate indexes
    let counter = 0;
    this.chapters.map(chapter => chapter.id = counter++);
  }

  /**
   * @summary Assert that all chapters are valid
   * @returns `true` if all chapters are filled; `false` otherwise
   */
  public isContentValid(): boolean {
    this.chapters.forEach(chapter => {
      if (chapter.content === ''
        || chapter.expectedWord === ''
        || chapter.messageFailure === ''
        || chapter.question === '') {
        return false;
      }
    });

    return true;
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
    // Clear all values
    this.chapters = new Array<IChapter>();

    // Add a new empty chapter
    this.addChapter();
  }

  /**
   * @summary Validate all values provided by the user and save them
   */
  public onSubmit(): void {
    // Validate all chapters
    if (!this.isContentValid()) {
      // TODO: error message
      return;
    }

    // Save chapters
    // TODO

    // Redirect the user to the export page
    // TODO
    this.router.navigate([`#`]);
  }

  /**
   * @summary Remove an item at a given position
   * @param position Position of the item to delete
   */
  private removeItem(position: number): void {
    // If the minimum number of chapters allowed is reached, does nothing
    if (this.chapters.length === this.chaptersBounds.min) {
      // TODO: error notification
      return;
    }

    // Remove the chapter at the given position
    this.chapters.splice(position, 1);
  }

}
