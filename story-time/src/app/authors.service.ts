import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  /**
   * @summary list of all authors
   */
  // tslint:disable-next-line: variable-name
  private readonly _authors: Array<string> = [
    'Pierre Bouillon',
    'Timothée Adam',
    'Victor Varnier'
  ];

  get authors(): Array<string> { return this._authors; }

  constructor() { }
  
}
