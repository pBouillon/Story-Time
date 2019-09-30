import { Component, OnInit } from '@angular/core';
import { EditorService } from '../editor.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/app-routing.module';
import { IChapter, Chapter } from 'src/app/shared/chapter';

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

    // TODO: remove - only for tests purposes
    this.chapters.push(new Chapter('I\'m', 'testing', 'stuff'));
  }

  /**
   * @summary Redirect the user back to the main menu
   */
  public onBack(): void {
    this.router.navigate([`${AppRoutes.Writing}/${AppRoutes.Infos}`]);
  }

}
