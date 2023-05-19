import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  urlSearch = "https://search.jaemy.net/search";// api tìm kiếm
  urlRegister = "https://api.todaikorean.com/api/auth/register";// api đăng ký
  urlLogin = "https://api.todaikorean.com/api/auth/login";// api đăng ký
  urlLogout = "https://api.todaikorean.com/api/auth/logout";
}
