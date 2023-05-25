import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  urlMain = "https://api.todaikorean.com/api/";
  urlSearch = "https://search.jaemy.net/search";// api tìm kiếm
}
