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
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/app-routing.module';
import { IStory } from 'src/app/shared/story';
import { SelectionService } from './selection.service';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {

  /**
   * Default constructor
   * @param router Router to redirect the user to the requested pages
   */
  constructor(
    private router: Router,
    public selectionService: SelectionService
  ) { }

  /**
   * @summary Initialize the component
   */
  ngOnInit() {
    // Fetch the cached stories
    this.selectionService.retrieveCachedStories();
  }

  /**
   * @summary import new stories
   * @param event Event thrown on file drop
   */
  public onChange(event: EventTarget): void {
    // Extract relevant data from the event
    const eventObj = event as MSInputMethodContext;
    const target = eventObj.target as HTMLInputElement;

    // Extract uploaded files
    this.selectionService.importFiles(target.files);
  }

  /**
   * @summary Remove all stored stories
   */
  public onClear(): void {
    this.selectionService.clearStories();
  }

  /**
   * @summary Redirect the user to the main menu
   */
  public onMenu(): void {
    this.router.navigate([`${AppRoutes.Index}`]);
  }

}
