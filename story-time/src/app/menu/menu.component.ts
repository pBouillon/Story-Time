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
    this.router.navigate([AppRoutes.About]);
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
