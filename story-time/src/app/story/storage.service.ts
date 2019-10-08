/**
 * MIT License
 *
 * Copyright © 2019 ADAM Timothée, BOUILLON Pierre, VARNIER Victor
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Injectable } from '@angular/core';

/**
 * @summary The storage service provides a bunch of tool to handle the local storage
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  /**
   * @summary Clear a stored value with its key
   * @param key Key of the value to clear
   */
  public clear(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * @summary Fetch a stored value with its key
   * @param key Key of the value to fetch
   */
  public get(key: string): string {
    return localStorage.getItem(key);
  }

  /**
   * @summary Store data in the local storage
   * @param key Key of the data to store
   * @param toStore Data to store as JSON
   */
  public store(key: string, toStore: object): void {
    localStorage.setItem(key, JSON.stringify(toStore));
  }
}
