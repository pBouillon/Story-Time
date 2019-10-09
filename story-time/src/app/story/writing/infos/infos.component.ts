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
   * @summary Title authorized lengths
   */
  public readonly TITLE_LENGTH = new LengthSpec(2, 60);

  /**
   * @summary Form containing story's data
   */
  public storyMetaForm: FormGroup;

  /**
   * @summary Dynamic tags list
   */
  public tagsList = Array<string>();

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
    this.tagsList = new Array<string>();

    this.storyMetaForm.setValue({
      author: '',
      overview: '',
      title: '',
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
      tags: this.tagsList,
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
        Validators.maxLength(specification.max);
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
      title: currentStoryMeta.title || '',
    });

    this.tagsList = currentStoryMeta.tags || [];
  }

}
