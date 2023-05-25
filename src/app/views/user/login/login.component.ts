import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LanguageService } from 'src/app/services/language.service';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { isPlatformBrowser } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';

// interface DataFormUser {
//   email: string,
//   password: string,
//   agree: boolean
// }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  res: any;
  checkSubmit = false;
  isBrowser = false;
  checkEmailForm = true;
  LoggingIn = false;
  user = {
    email: '',
    password: '',
    agree: false,
  };
  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private apiUser: UserService,
    private router: Router,
    private lang: LanguageService,
    private common: CommonService,
    private broadCaster: BroadcastService,
    private localStorage: LocalStorageService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      // this.user.email = this.localStorage.getItem('user').email;
      // this.user.password = this.localStorage.getItem('user').password;
    }
  }

  handleLogin(): void {
    if (this.LoggingIn) {
      return;
    }
    this.LoggingIn = true;
    this.checkSubmit = true;
    if (!this.checkEmailForm) {
      return;
    }
    if (!this.user.password) {
      return;
    }
    let did = this.common.makeid(8);// tạo device_id
    this.apiUser.login({
      email: this.user.email,
      password: this.user.password,
      device_id: did
    }).subscribe(res => {
      this.res = res;
      this.LoggingIn = false;
      if (res.status === 1) {
        console.log(res);
        this.broadCaster.broadcast('user', {
          user: res,
          logoutOrRegister: ""
        })
        this.router.navigate([this.lang.lang]);
      }
    });
  }

  onFocusout(type: number): void {
    //type = 0 là focus input email, 1 focus input password
    if (type === 0) {
      this.checkEmailForm = this.common.validateEmail(this.user.email);
    }

  }

  onFocus(type: number): void {// xóa thông bảo tk hoặc mk 
    //type = 0 là focus input email, 1 focus input password
    if (type === 0) {
      this.checkEmailForm = true;
    }
    if (this.res) {
      this.res.status = 1;
    }
  }


}
