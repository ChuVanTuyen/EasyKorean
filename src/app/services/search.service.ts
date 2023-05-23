import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UrlService } from './url.service';
import { DataSearch } from 'src/app/data-structure/Common';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient, private url: UrlService) { }

  getSearch(dataSend: DataSearch): Observable<any> {
    return this.http.post<any>(this.url.urlSearch, dataSend)
      .pipe(
        catchError((err) => { return throwError('Lỗi rồi!') }),
      );
  }
}
