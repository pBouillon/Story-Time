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
   * @todo doc
   * @todo set limit for chapter's answer and fetch it
   */
  public readonly ANSWER_LENGTH = new LengthSpec(0, 140);

  /**
   * @summary Provided chapter to be displayed
   */
  @Input()
  public chapter: IChapter;

  /**
   * @todo doc
   */
  @Output()
  public sumbittedAnswer = new EventEmitter<string>();

  /**
   * @todo doc
   */
  public chapterAnswerForm: FormGroup;

  /**
   * @todo doc
   */
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  /**
   * @todo doc
   */
  public ngOnInit() {
    this.setupForm();
  }

  /**
   * @todo doc
   */
  get answer(): AbstractControl {
    return this.chapterAnswerForm.get('answer');
  }

  /**
   * @todo doc
   */
  public isAnswerInvalid(): boolean {
    return this.answer.invalid
      && (this.answer.dirty
        || this.answer.touched);
  }

  /**
   * @todo
   */
  public onSubmit(): void {
    this.sumbittedAnswer.emit(this.answer.value);
  }

  /**
   * @todo doc
   */
  private setupForm(): void {

    /**
     * @todo doc
     * @param specification
     */
    const getValidatorsFromSpec = (specification: LengthSpec) => {
      return Validators.minLength(specification.min),
        Validators.maxLength(specification.max);
    };

    // Form building
    this.chapterAnswerForm = this.formBuilder.group({
      answer: ['', [
        Validators.required,
        getValidatorsFromSpec(this.ANSWER_LENGTH),
      ]]
    });
  }

}
