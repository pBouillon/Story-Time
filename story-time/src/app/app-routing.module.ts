import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { PageNotFoundComponent } from './error-pages/page-not-found/page-not-found.component';

/**
 * @summary Reference route constants
 */
const enum AppRoutes {
  // Main page
  Index = 'index',
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
