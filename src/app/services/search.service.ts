import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { UrlService } from './url.service';
import { DataSearch } from 'src/app/data-structure/Common';
import { CacheDictionaryService } from './cache-dictionary.service';
import { LanguageService } from './language.service';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    constructor(
        private http: HttpClient,
        private url: UrlService,
        private cacheDictionary: CacheDictionaryService,
        private lang: LanguageService
    ) { }

    getSearch(dataSend: DataSearch): Observable<any> {// lấy data search dictionary từ serve
        let strDataKey = dataSend.text + this.lang.lang + dataSend.type;
        if (this.cacheDictionary.has(strDataKey)) {// lấy data trong cache nếu có
            return of(this.cacheDictionary.getData(strDataKey));
        } else {
            return this.http.post<any>(this.url.urlSearch, dataSend)
                .pipe(
                    catchError((err) => { return throwError('Lỗi rồi!') }),
                    map((data) => {
                        this.cacheDictionary.setData(strDataKey, data);// lưu data vào cache
                        return data;
                    })
                );
        }
    }
}
