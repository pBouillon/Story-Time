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
