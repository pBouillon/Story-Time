/**
 * MIT License
 *
 * Copyright (c) 2019 ADAM Timothée, BOUILLON Pierre, VARNIER Victor
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

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppRoutes } from '../app-routing.module';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  /**
   * @summary Default constructor
   * @param router Router to redirect the user to requested components
   */
  constructor(
    private router: Router,
  ) { }

  /**
   * @summary Redirect the user to the site's details
   */
  public onAbout(): void {
    // TODO: create associated component
    // TODO: add it to routing
    // TODO: redirect on this component
    this.router.navigate(['#']);
  }

  /**
   * @summary Redirect the user to the story selection
   */
  public onGame(): void {
    // TODO: create associated component
    // TODO: add it to routing
    // TODO: redirect on this component
    this.router.navigate(['#']);
  }

  /**
   * @summary Redirect the user to the story writing
   */
  public onWrite(): void {
    // TODO: create associated component
    // TODO: add it to routing
    // TODO: redirect on this component
    this.router.navigate([AppRoutes.Writing]);
  }
}
