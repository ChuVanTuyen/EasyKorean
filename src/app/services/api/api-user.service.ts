import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { UrlService } from './url.service';
import { DataLogin, DataLogout, DataRegister } from 'src/app/data-structure/User';

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
  logout(dataSend: any, headers: any): Observable<any> {
    return this.http.post<any>(this.url.urlLogout, headers, dataSend)
      .pipe(
        catchError((err) => { return of(err) }),
      )
  }
}
