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

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AppRoutes } from '../app-routing.module';
import { EditorService } from '../story/writing/editor.service';

@Injectable({
  providedIn: 'root'
})
export class ContentWritingGuard implements CanActivate {

  constructor(
    private editorService: EditorService,
    private router: Router,
  ) { }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const storedStoryMeta = this.editorService
      .getCurrentStoryMeta();

    const isContentAccessGranted = storedStoryMeta !== null
      && storedStoryMeta.author !== ''
      && storedStoryMeta.overview !== ''
      && storedStoryMeta.title !== '';

    if (!isContentAccessGranted) {
      this.router.navigate([`${AppRoutes.Writing}/${AppRoutes.Infos}`]);
    }

    return isContentAccessGranted;
  }

}
