import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { PageNotFoundComponent } from './error-pages/page-not-found/page-not-found.component';
import { InfosComponent } from './story/writing/infos/infos.component';

/**
 * @summary Reference route constants
 */
const enum AppRoutes {
  // Main page
  Index = 'index',
  // Story writing
  Writing = 'writing',
  Infos = 'infos',
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
