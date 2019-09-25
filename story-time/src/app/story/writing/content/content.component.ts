import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  // TODO bloquer l'accès si la page précédente n'est pas validée

  constructor() { }

  ngOnInit() { }

}
