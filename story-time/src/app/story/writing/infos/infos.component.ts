import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { EditorService } from '../editor.service';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/app-routing.module';

/**
 * @summary Lenght specifications for a field
 */
class LenghtSpec {

  /**
   * @summary Default constructor
   * @param min Minimal size of the field
   * @param max Maximum size of the field
   */
  constructor(
    public min: number,
    public max: number,
  ) { }
}

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.scss']
})
export class InfosComponent implements OnInit {

  /**
   * @summary Author authorized lengths
   */
  public readonly AUTHOR_LENGTH = new LenghtSpec(3, 25);

  /**
   * @summary Overview authorized lengths
   */
  public readonly OVERVIEW_LENGTH = new LenghtSpec(5, 140);

  /**
   * @summary Tags authorized lengths
   */
  public readonly TAGS_LENGTH = new LenghtSpec(0, 40);

  /**
   * @summary Title authorized lengths
   */
  public readonly TITLE_LENGTH = new LenghtSpec(2, 60);

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

  /**
   * @summary Initialize the component
   */
  ngOnInit() {
    this.setupForm();
  }

  /**
   * @summary Getter for the `author` field of the form
   * @returns The author as string
   */
  get author(): AbstractControl {
    return this.fetchFormProperty('author');
  }

  /**
   * @summary Getter for the `overview` field of the form
   * @returns The overview as a string
   */
  get overview(): AbstractControl {
    return this.fetchFormProperty('overview');
  }

  /**
   * @summary Getter for the `tags` field of the form
   * @returns An array of tags that may be empty
   */
  get tags(): AbstractControl {
    return this.fetchFormProperty('tags');
  }

  /**
   * @summary Getter for the `title` field of the form
   * @returns The title as string
   */
  get title(): AbstractControl {
    return this.fetchFormProperty('title');
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
    return this.overview.value.length;
  }

  /**
   * @summary Check if a field has to be considered as invalid for the form
   *
   * A field is invalid if it is marked as invalid by the form and the user
   * had already interract with it
   *
   * @param field field's name to check
   * @returns true if the field is invalid; false otherwise
   */
  public isFieldInvalid(field: AbstractControl): boolean {
    return field.invalid
      && (field.dirty
        || field.touched);
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
    // Does not perform any action if the form is invalid
    if (this.storyMetaForm.invalid) {
      return;
    }

    // Store the data in the local storage
    this.editorService.storeStoryMeta({
      author: this.author.value,
      overview: this.overview.value,
      tags: this.tags.value
        .split(',')
        .map(tag => tag.trim()),
      title: this.title.value,
    });

    // Redirect the user to the next page
    this.router.navigate(['#']);
  }

  /**
   * @summary Build the story's meta form
   */
  private setupForm(): void {
    // Creates the form
    this.storyMetaForm = this.formBuilder.group({
      author: ['', [
        Validators.required,
        Validators.minLength(this.AUTHOR_LENGTH.min),
        Validators.maxLength(this.AUTHOR_LENGTH.max)
      ]],
      overview: ['', [
        Validators.required,
        Validators.minLength(this.OVERVIEW_LENGTH.min),
        Validators.maxLength(this.OVERVIEW_LENGTH.max)
      ]],
      tags: ['', [
        Validators.minLength(this.TAGS_LENGTH.min),
        Validators.maxLength(this.TAGS_LENGTH.max)
      ]],
      title: ['', [
        Validators.required,
        Validators.minLength(this.TITLE_LENGTH.min),
        Validators.maxLength(this.TITLE_LENGTH.max)
      ]],
    });

    // Fetch already existing values
    const currentStoryMeta = this.editorService.getCurrentStoryMeta();

    // Early exit if no values found
    if (currentStoryMeta === null) {
      return;
    }

    this.storyMetaForm.patchValue({
      author: currentStoryMeta.author || '',
      overview: currentStoryMeta.overview || '',
      tags: currentStoryMeta.tags.join(', ') || '', // TODO: to const
      title: currentStoryMeta.title || '',
    });
  }

}
