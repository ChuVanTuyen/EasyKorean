import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { DataLogin, DataRegister } from 'src/app/data-structure/Common';
import { Observable, catchError, map, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {

  constructor(private http: HttpClient, private url: UrlService) { }

  register(dataSend: DataRegister): Observable<any> {
    return this.http.post<any>(this.url.urlRegister, dataSend)
      .pipe(
        catchError((err) => { return of(err) }),
      );
  }

  login(dataSend: DataLogin): Observable<any> {
    return this.http.post<any>(this.url.urlLogin, dataSend)
      .pipe(
        catchError((err) => { return of(err) }),
      );
  }
}
