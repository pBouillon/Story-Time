import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  authors: Array<string> = [
    'Pierre Bouillon',
    'Timothée Adam',
    'Victor Varnier'
  ];

  constructor() { }

  ngOnInit() { }

}
