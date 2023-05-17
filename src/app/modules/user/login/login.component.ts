import { Component } from '@angular/core';
import { DataLogin } from 'src/app/data-structure/Common';
import { ApiUserService } from 'src/app/services/api/api-user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';

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
export class LoginComponent {
  res: any;
  user = {
    email: 'abc@hmail.com',
    password: '123456',
    agree: true,
  };
  constructor(
    private apiUser: ApiUserService,
    private localStorage: LocalStorageService,
    private router: Router,
    private lang: LanguageService,
  ) { }
  handleLogin(data: DataFormUser): void {
    this.user = data;
    if (!data.email) {
      return;
    }
    if (!data.password) {
      return;
    }
    this.apiUser.login({
      email: data.email,
      password: data.password,
      device_id: "ABC-EDF-212-23DSnjsaxnaj"
    }).subscribe(res => {
      this.res = res;
      console.log(res);
      if (res.status === 1) {
        if (data.agree) {
          this.localStorage.setItem('user', {
            email: data.email,
            name: res.name
          })
        }
        this.router.navigate([this.lang.lang]);
      }
    });
  }

  removeWarnForm(event: Event, type: number): void {// kiểm tra cảnh báo đỏ khi người dùng nhập
    if (type === 0) {// khi người dùng nhập email
      this.user.email = (event.target as HTMLInputElement).value;
    }
    if (type === 1) {// đỏ khi người dùng nhập mật khẩu
      this.user.password = (event.target as HTMLInputElement).value;
    }
  }
}
