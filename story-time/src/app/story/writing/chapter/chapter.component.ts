import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss']
})
export class ChapterComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  private _title = '';

  @Input()
  get title(): string { return this._title; }
  set title(title: string) { this._title = title; }


  constructor() { }

  ngOnInit() { }

}
