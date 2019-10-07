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
import { EditorService } from '../editor.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/app-routing.module';
import { IStory } from 'src/app/shared/story';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {

  /**
   * @summary Generated URL of the story JSON file
   */
  public jsonUrl: SafeUrl;

  /**
   * Default constructor
   * @param editorService Editor toolbox
   * @param router Router to redirect the user to the requested pages
   * @param sanitizer DomSanitizer used to generate the downloaded .story file
   */
  constructor(
    private editorService: EditorService,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.jsonUrl = this.generateDownloadJsonUri();
  }

  /**
   * @summary Generate the download URL of the story JSON file
   * @return The assoriated URL
   */
  public generateDownloadJsonUri() {
    // Create the story
    const story: IStory = {
      meta: this.editorService.getCurrentStoryMeta(),
      story: this.editorService.getCurrentStoryChapters()
    };

    // Fetch story data
    const toSerialize = JSON.stringify(story);

    // Generate the associated URI
    const format = 'data:text/json;charset=UTF-8,';
    return this.sanitizer.bypassSecurityTrustUrl(format + encodeURIComponent(toSerialize));
  }

  /**
   * @summary Generate the name of the file to export
   *          The name is built as `<story title>.<story extension>`
   * @returns The generated name
   */
  public getExportedFileName(): string {
    const storyName = this.editorService
      .getCurrentStoryMeta()
      .title
      .trim()
      .toLowerCase()
      .replace(/ /g, '_', );

    return `${storyName}${this.editorService.EXTENSION_NAME}`;
  }

  /**
   * @summary Redirect the user to the previous page
   */
  public onBack(): void {
    this.router.navigate([`${AppRoutes.Writing}/${AppRoutes.Content}`]);
  }

  /**
   * @summary Redirect the user to the main menu and clear its cache
   */
  public onMenu(): void {
    // Clear the stored story
    this.editorService.clearAllStoryData();

    // Redirect the user
    this.router.navigate([`${AppRoutes.Index}`]);
  }

}
