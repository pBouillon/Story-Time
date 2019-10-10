import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-about-data',
  templateUrl: './about-data.component.html',
  styleUrls: ['./about-data.component.scss']
})
export class AboutDataComponent {

  /**
   * @summary
   */
  @Input()
  public aboutText: string;

  /**
   * @summary
   */
  @Input()
  public imageSource: string;

  constructor() { }

}
