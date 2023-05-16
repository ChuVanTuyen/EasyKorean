import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SearchUrlService } from './search-url.service';
import { DataSearch } from 'src/app/data-structure/Common';

@Injectable({
  providedIn: 'root'
})
export class ApiSearchService {
  constructor(private http: HttpClient, private urlSearch: SearchUrlService) { }

  getSearch(dataSend: DataSearch): Observable<any> {
    return this.http.post<any>(this.urlSearch.urlSearch, dataSend)
      .pipe(
        catchError((err) => { return throwError('Lỗi rồi!') }),
      );
  }
}
