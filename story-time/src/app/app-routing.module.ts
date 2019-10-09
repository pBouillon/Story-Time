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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { PageNotFoundComponent } from './error-pages/page-not-found/page-not-found.component';
import { InfosComponent } from './story/writing/infos/infos.component';
import { AboutComponent } from './about/about.component';
import { ContentComponent } from './story/writing/content/content.component';
import { ContentWritingGuard } from './guards/content-writing.guard';
import { ExportComponent } from './story/writing/export/export.component';
import { ContentExportGuard } from './guards/content-export.guard';
import { SelectionComponent } from './story/selection/selection.component';

/**
 * @summary Reference route constants
 */
export const enum AppRoutes {
  // Par ordre alphabétique
  // About page
  About = 'about',
  // Export
  Export = 'export',
  // Main page
  Index = 'index',
  // Story selection
  Selection = 'selection',
  // Story writing
  Content = 'content',
  Infos = 'infos',
  Writing = 'writing',
}

/**
 * @summary Define all redirections and routes
 */
const routes: Routes = [
  /**
   * Redirections
   * ------------
   */
   // Redirect to index
  {
    path: '',
    redirectTo: AppRoutes.Index,
    pathMatch: 'full',
  },

  /**
   * Routes
   * ------
   */
  // Main menu
  {
    path: AppRoutes.Index,
    component: MenuComponent,
  },
  // Story selection
  {
    path: AppRoutes.Selection,
    component: SelectionComponent,
  },
  // Story writing
  {
    path: AppRoutes.Writing,
    children: [{
      path: '',
      redirectTo: AppRoutes.Infos,
      pathMatch: 'full',
    }, {
      path: AppRoutes.Infos,
      component: InfosComponent,
    }, {
      path: AppRoutes.Content,
      component: ContentComponent,
      canActivate: [
        ContentWritingGuard,
      ],
    }, {
      path: AppRoutes.Export,
      component: ExportComponent,
      canActivate: [
        ContentExportGuard,
      ]
    }]
  }, {
    path: AppRoutes.About,
    component: AboutComponent,
  },

  /**
   * Error pages
   * -----------
   */
   // 404
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
