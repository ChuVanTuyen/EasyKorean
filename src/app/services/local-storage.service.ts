import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  isSupport(): boolean {
    if (localStorage) {
      return true;
    }
    return false;
  }

  getItem(key: string): any {
    let data = localStorage.getItem(key);
    if (typeof data === 'string') {
      return JSON.parse(data);
    }
  }

  setItem(key: unknown, value: unknown): void {
    if (!this.isSupport()) {
      console.error("Trình duyệt này không hỗ trợ localStorage");
    }
    if (typeof key !== 'string') {
      console.error("key truyền vào cho local không phải là string");
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }

  }
  clear(): void {
    localStorage.clear();
  }
}
