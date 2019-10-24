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

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IChapter } from 'src/app/shared/chapter';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { LengthSpec } from 'src/app/shared/length-spec';

@Component({
  selector: 'app-played-chapter',
  templateUrl: './played-chapter.component.html',
  styleUrls: ['./played-chapter.component.scss']
})
export class PlayedChapterComponent implements OnInit {

  /**
   * @summary Answer length limits
   */
  public readonly ANSWER_LENGTH = new LengthSpec(0, 140);

  /**
   * @summary Provided chapter to be displayed
   */
  @Input()
  public chapter: IChapter;

  /**
   * @summary Emitter for the submitted answer
   */
  @Output()
  public sumbittedAnswer = new EventEmitter<string>();

  /**
   * @summary Form to submit chapter's answer
   */
  public chapterAnswerForm: FormGroup;

  /**
   * @summary Default constructor
   * @param formBuilder FormBuilder to create the chapter's form
   */
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  /**
   * @summary Initialize the component
   */
  public ngOnInit() {
    this.setupForm();
  }

  /**
   * @summary Fetch the `answer` field in the form
   */
  public get answer(): AbstractControl {
    return this.chapterAnswerForm.get('answer');
  }

  /**
   * @summary Check if the field is valid
   */
  public isAnswerInvalid(): boolean {
    return this.answer.invalid
      && (this.answer.dirty
        || this.answer.touched);
  }

  /**
   * @summary Sumbit the provided answer to the parent component
   */
  public onSubmit(): void {
    // Emit the submitted answer
    this.sumbittedAnswer.emit(this.answer.value);

    // Reset the text
    this.chapterAnswerForm.patchValue({answer: ''});
    this.answer.markAsUntouched();
  }

  /**
   * @summary Initiate the chapter's form
   */
  private setupForm(): void {
    this.chapterAnswerForm = this.formBuilder.group({
      answer: ['', [
        Validators.required,
        Validators.maxLength(this.ANSWER_LENGTH.max),
        Validators.minLength(this.ANSWER_LENGTH.min),
      ]]
    });
  }

}
