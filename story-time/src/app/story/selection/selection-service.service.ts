import { Injectable } from '@angular/core';
import { Story } from 'src/app/shared/story';

@Injectable({
  providedIn: 'root'
})
export class SelectionServiceService {

  // tslint:disable-next-line: variable-name
  private _stories: Array<Story>;

  constructor() { }
}
