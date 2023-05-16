import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlService } from './url.service';
import { DataRegister } from 'src/app/data-structure/Common';

@Injectable({
  providedIn: 'root'
})
export class ApiRegisterService {

  constructor(private http: HttpClient, private url: UrlService) { }

  register(dataSend: DataRegister): Observable<any> {
    return this.http.post<any>(this.url.urlRegister, dataSend)
      .pipe(
        catchError((err) => { return throwError('Lỗi rồi!') }),
      );
  }
}
