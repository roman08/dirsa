import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  get(key: string): any {
    if (this.isLocalStorageSupported) {
      return this.localStorage.getItem(key);
    }
    return null;
  }
  set(key: string, value: any): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }
  remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);

      return true;
    }
    return false;
  }

  clear() {
    this.localStorage.clear();
    return true;
  }
  get isLocalStorageSupported(): boolean {
    return !!this.localStorage;
  }
}
