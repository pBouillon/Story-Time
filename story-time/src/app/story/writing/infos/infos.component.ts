import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EditorService } from '../editor.service';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.sass']
})
export class InfosComponent implements OnInit {

  public readonly OVERVIEW_LENGTH = 140;

  /**
   * @summary Form containing story's data
   */
  public storyMetaForm: FormGroup;

  /**
   * Default constructor
   * @param formBuilder FormBuilder object to gather story's details
   * @param editorService Editor toolbox
   */
  constructor(
    private formBuilder: FormBuilder,
    private editorService: EditorService,
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
   * @summary Actions to perform on form submission
   */
  public onSubmit(): void {
    if (this.storyMetaForm.valid) {
      // TODO: action on form valid
    }
  }

  private fetchFormProperty(property: string): any {
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
