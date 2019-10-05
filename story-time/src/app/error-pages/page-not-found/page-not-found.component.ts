import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  /**
   * @summary Default constructor
   * @param router Router to redirect the user to requested components
   */
  constructor(
    private router: Router,
  ) { }

  ngOnInit() { }

  /**
   * @summary Redirect the user back to the main page
   */
  public onMenu(): void {
    this.router.navigate(['index']);
  }

}
