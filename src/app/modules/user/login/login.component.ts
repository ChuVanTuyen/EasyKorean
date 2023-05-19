import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

import { ApiUserService } from 'src/app/services/api/api-user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LanguageService } from 'src/app/services/language.service';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { isPlatformBrowser } from '@angular/common';

interface DataFormUser {
  email: string,
  password: string,
  agree: boolean
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  res: any;
  checkSubmit = false;
  user = {
    email: '',
    password: '',
    agree: true,
  };
  isBrowser = false;
  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private apiUser: ApiUserService,
    private localStorage: LocalStorageService,
    private router: Router,
    private lang: LanguageService,
    private broadCaster: BroadcastService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      let u = this.localStorage.getItem('user');
      if (u) {
        this.user.email = u.email;
        this.user.password = u.password;
      }

    }
  }

  handleLogin(data: DataFormUser): void {
    this.user = data;
    if (!data.email) {
      return;
    }
    if (!data.password) {
      return;
    }
    let did = this.makeid(8);// tạo device_id
    this.apiUser.login({
      email: data.email,
      password: data.password,
      device_id: did
    }).subscribe(res => {
      this.res = res;
      console.log(res);
      if (res.status === 1) {
        if (data.agree) {// lưu tài khoản vè mật khẩu
          this.localStorage.setItem('user', {
            id: res.id,
            email: data.email,
            name: res.name,
            password: data.password,
            image: res.image,
            device_id: did,
            remember_token: res.remember_token
          })
        } else { // không lưu tài khoản và mật khẩu
          this.localStorage.setItem('user', {
            id: res.id,
            email: '',
            name: res.name,
            password: '',
            image: res.image,
            device_id: did,
            remember_token: res.remember_token
          })
        }
        this.broadCaster.broadcast('user', { // gửi dữ liệu đến component header
          user: {
            id: res.id,
            email: data.email,
            name: res.name,
            password: data.password,
            image: res.image,
            device_id: did,
            remember_token: res.remember_token
          },
          LogoutOrRegister: "",
        })
        this.router.navigate([this.lang.lang]);
      }
    });
  }

  makeid(length: number) {// random chuỗi device_id
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
}
