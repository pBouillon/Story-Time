import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { EditorService } from '../editor.service';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/app-routing.module';
import { LengthSpec } from '../../../shared/length-spec';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.scss']
})
export class InfosComponent implements OnInit {

  /**
   * @summary Author authorized lengths
   */
  public readonly AUTHOR_LENGTH = new LengthSpec(3, 25);

  /**
   * @summary Overview authorized lengths
   */
  public readonly OVERVIEW_LENGTH = new LengthSpec(5, 140);

  /**
   * @summary Tags authorized lengths
   */
  public readonly TAGS_LENGTH = new LengthSpec(0, 40);

  /**
   * @summary used separator for tags listing
   */
  public readonly TAG_SEPARATOR = ',';

  /**
   * @summary Title authorized lengths
   */
  public readonly TITLE_LENGTH = new LengthSpec(2, 60);

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
   * had already interact with it
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
   * @summary Clear form's content
   */
  public onClear(): void {
    // Reset cached values
    this.editorService.clearCurrentStoryMeta();

    // Reset form values
    this.storyMetaForm.setValue({
      author: '',
      overview: '',
      title: '',
      tags: ''
    });
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
        .split(this.TAG_SEPARATOR)
        .map(tag => tag.trim()),
      title: this.title.value,
    });

    // Redirect the user to the next page
    this.router.navigate([`${AppRoutes.Writing}/${AppRoutes.Content}`]);
  }

  /**
   * @summary Build the story's meta form
   */
  private setupForm(): void {

    /**
     * @summary Inner-function to generate validators for lengths
     * @param specification Defined specification precising the lengths
     * @returns The `minLength` and `maxLength` validators associated with the
     *          given `specification`
     */
    const getValidatorsFromSpec = (specification: LengthSpec) => {
      return Validators.minLength(specification.min),
        Validators.minLength(specification.max);
    };

    // Creates the form
    this.storyMetaForm = this.formBuilder.group({
      author: ['', [
        Validators.required,
        getValidatorsFromSpec(this.AUTHOR_LENGTH),
      ]],
      overview: ['', [
        Validators.required,
        getValidatorsFromSpec(this.OVERVIEW_LENGTH),
      ]],
      tags: ['', [
        getValidatorsFromSpec(this.TAGS_LENGTH),
      ]],
      title: ['', [
        Validators.required,
        getValidatorsFromSpec(this.TITLE_LENGTH),
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
      tags: currentStoryMeta.tags.join(`${this.TAG_SEPARATOR} `) || '',
      title: currentStoryMeta.title || '',
    });
  }

}
