import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, data) {
    try {
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  }

  getItem(key: string) {
    try {
      const data = localStorage.getItem(key);
      return JSON.parse(data);
    } catch (error) {
      console.error(error);
      return {};
    }
  }
}
