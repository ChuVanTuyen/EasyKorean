import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { UrlService } from './url.service';
import { DataSearch } from 'src/app/data-structure/Common';
import { CacheDictionaryService } from './cache-dictionary.service';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    constructor(
        private http: HttpClient,
        private url: UrlService,
        private cacheDictionary: CacheDictionaryService
    ) { }

    getSearch(dataSend: DataSearch): Observable<any> {// lấy data search dictionary từ serve
        let strDataSearch = dataSend.text + dataSend.type;
        if (this.cacheDictionary.has(strDataSearch)) {// lấy data trong cache nếu có
            return of(this.cacheDictionary.getData(strDataSearch));
        } else {
            return this.http.post<any>(this.url.urlSearch, dataSend)
                .pipe(
                    catchError((err) => { return throwError('Lỗi rồi!') }),
                    map((data) => {
                        console.log('call running')
                        this.cacheDictionary.setData(strDataSearch, data);// lưu data vào cache
                        return data;
                    })
                );
        }
    }
}
