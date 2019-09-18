import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';

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
  }, {
    path: '**',
    redirectTo: AppRoutes.Index,
    pathMatch: 'full',
  },
  // Routes
  {
    path: AppRoutes.Index,
    component: MenuComponent,
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
