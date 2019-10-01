import { Component, OnInit } from '@angular/core';
import { EditorService } from '../editor.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/app-routing.module';
import { IChapter, Chapter, ChapterAction } from 'src/app/shared/chapter';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  // TODO bloquer l'accès si la page précédente n'est pas validée

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
  private addChapter(position: number = this.chapters.length): any {
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
   * @summary Redirect the user back to the main menu
   */
  public onBack(): void {
    this.router.navigate([`${AppRoutes.Writing}/${AppRoutes.Infos}`]);
  }

  /**
   * @summary Remove an item at a given position
   * @param position Position of the item to delete
   */
  private removeItem(position: number): void {
    this.chapters.splice(position, 1);
  }

}
