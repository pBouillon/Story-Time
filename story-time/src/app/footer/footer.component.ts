import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  /**
   * @summary list of all authors
   */
  readonly authors: Array<string> = [
    'Pierre Bouillon',
    'Timothée Adam',
    'Victor Varnier'
  ];

  constructor() { }
}
