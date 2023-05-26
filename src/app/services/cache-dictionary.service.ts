import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheDictionaryService {

  cache = new Map<string, any>();
  limit = 10;

  constructor() { }

  setData(key: string, value: any) {
    if (this.cache.size >= this.limit) {// nếu vượt quá 10 cặp key value thì sẽ xóa phần tử đầu tiên
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  getData(key: string) {
    return this.cache.get(key);
  }

  has(key: string) {
    return this.cache.has(key) ? true : false;
  }
}
