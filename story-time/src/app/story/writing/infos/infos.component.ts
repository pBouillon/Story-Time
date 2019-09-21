import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { EditorService } from '../editor.service';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/app-routing.module';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.scss']
})
export class InfosComponent implements OnInit {

  public readonly OVERVIEW_LENGTH = 140;

  /**
   * @summary Form containing story's data
   */
  public storyMetaForm: FormGroup;

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
    this.setupForm();
  }

  /**
   * @summary Getter for the `author` field of the form
   * @returns The author as string
   */
  get author(): string {
    return this.fetchFormProperty('author').value;
  }

  /**
   * @summary Getter for the `overview` field of the form
   * @returns The overview as a string
   */
  get overview(): string {
    return this.fetchFormProperty('overview').value;
  }

  /**
   * @summary Getter for the `tags` field of the form
   * @returns An array of tags that may be empty
   */
  get tags(): string {
    return this.fetchFormProperty('tags').value
      .split(',')
      .map(tag => tag.trim());
  }

  /**
   * @summary Getter for the `title` field of the form
   * @returns The title as string
   */
  get title(): string {
    return this.fetchFormProperty('title').value;
  }

  /**
   * @summary Redirect the user back to the main menu
   */
  public onBack(): void {
    this.router.navigate([AppRoutes.Index]);
  }

  /**
   * @summary Actions to perform on form submission
   */
  public onSubmit(): void {
    if (this.storyMetaForm.valid) {
      // TODO: action on form valid
    }
  }

  /**
   * @summary Fetch a property from the `storyMetaForm`
   * @param property Property to fetch
   * @returns An AbstractControl of the associated property
   */
  private fetchFormProperty(property: string): AbstractControl {
    return this.storyMetaForm.get(property);
  }

  /**
   * @summary Get the current length of the story's summary
   * @returns The current length of the story's summary
   */
  public getOverviewCurrentSize(): number {
    return this.overview.length;
  }

  /**
   * @summary Build the story's meta form
   */
  private setupForm(): void {
    this.storyMetaForm = this.formBuilder.group({
      author: ['', Validators.required],
      overview: ['', Validators.required],
      tags: [''],
      title: ['', Validators.required],
    });
  }

}
