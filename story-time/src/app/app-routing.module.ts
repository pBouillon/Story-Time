import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { PageNotFoundComponent } from './error-pages/page-not-found/page-not-found.component';
import { InfosComponent } from './story/writing/infos/infos.component';
import { ContentComponent } from './story/writing/content/content.component';
import { ContentWritingGuard } from './guards/content-writing.guard';
import { ExportComponent } from './story/writing/export/export.component';

/**
 * @summary Reference route constants
 */
export const enum AppRoutes {
  // Export
  Export = 'export',
  // Main page
  Index = 'index',
  // Story writing
  Content = 'content',
  Infos = 'infos',
  Writing = 'writing',
}

/**
 * @summary Define all redirections and routes
 */
const routes: Routes = [
  // Redirections
  {
    path: '',
    redirectTo: AppRoutes.Index,
    pathMatch: 'full',
  },
  // Routes
  {
    path: AppRoutes.Index,
    component: MenuComponent,
  }, {
    path: AppRoutes.Writing,
    children: [{
      path: '',
      redirectTo: AppRoutes.Infos,
      pathMatch: 'full'
    }, {
      path: AppRoutes.Infos,
      component: InfosComponent
    }, {
      path: AppRoutes.Content,
      component: ContentComponent,
      canActivate: [
        ContentWritingGuard,
      ],
    }, {
      path: AppRoutes.Export,
      component: ExportComponent,
      // TODO: guar
    }]
  },
  // Error pages
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
