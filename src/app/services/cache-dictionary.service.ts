import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheDictionaryService {
  cache = new Map<string, any>();
  getData(key: string): any {
    return this.cache.get(key);
  }
  setData(key: string, data: any) {
    this.cache.set(key, data);
  }
  has(key: string) {
    return this.cache.has(key) ? true : false;
  }
}
