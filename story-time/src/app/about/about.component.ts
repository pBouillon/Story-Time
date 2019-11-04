import { Component, OnInit } from '@angular/core';
import { AuthorsService } from '../authors.service';
import { AboutData } from './about-data';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/app-routing.module';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  /**
   * @todo
   */
  public sections: Array<AboutData>;

  constructor(
    private router: Router,
    public authorService: AuthorsService,
  ) { }

  ngOnInit() {
    this.sections = [
      new AboutData(
        'sample text #1',
        '../../assets/tncy_logo.png'
      ),
      new AboutData(
        'sample text #2',
        '../../assets/tncy_logo.png'
      )
    ];
  }

/**
   * @summary Redirect the user to the main menu
   */
  public onMenu(): void {
    this.router.navigate([`${AppRoutes.Index}`]);
  }

}
