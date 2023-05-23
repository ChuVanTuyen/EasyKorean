import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { LanguageService } from 'src/app/services/language.service';

interface UserFormData {
  email: string,
  password: string,
  rePassword: string,
  agree: boolean,
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user = {
    email: 'abcabc@gmail.com',
    password: 'abcabc',
    rePassword: 'abcabc',
    agree: true,
  };
  checkEmailForm = true; // kiểm tra mail đã đúng định dạng hay chưa
  res: any;
  checkSubmit = false;
  constructor(
    private apiUser: UserService,
    private lang: LanguageService,
    private router: Router,
    private broadCaster: BroadcastService
  ) { }

  ngOnInit(): void {
  }

  onRegister(userData: UserFormData): void {
    this.user = userData;
    this.checkSubmit = true;
    this.validateEmail(this.user.email);
    if (!this.checkEmailForm || this.user.password.length < 6 || this.user.password !== this.user.rePassword) {
      return;
    }
    this.apiUser.register({// đăng ký lên serve
      email: this.user.email,
      password: this.user.password,
      language: this.lang.lang
    }).subscribe(res => {
      this.res = res;
      if (res.status === 1) {
        this.broadCaster.broadcast('user', { // gửi dữ liệu đến component header
          user: {
            id: res.id,
            email: this.user.email,
            name: res.name,
            password: this.user.password,
            image: res.image,
            device_id: this.makeid(8),
            remember_token: res.remember_token
          },
          LogoutOrRegister: "Registered",
        })
        this.router.navigate([this.lang.lang]);
      }
      console.log(res);
    });
  }

  removeWarnForm(event: Event, type: number): void {// kiểm tra cảnh báo khi người dùng nhập
    if (type === 0) {// khi người dùng nhập email
      this.user.email = (event.target as HTMLInputElement).value;
      this.validateEmail(this.user.email);
    }
    if (type === 1) {// khi người dùng nhập mật khẩu
      this.user.password = (event.target as HTMLInputElement).value;
    }
    if (type === 2) {
      this.user.rePassword = (event.target as HTMLInputElement).value;
    }
    if (type === 3) {
      this.user.agree = (event.target as HTMLInputElement).checked;
    }
  }

  validateEmail(inputText: string) {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.match(mailformat)) {
      this.checkEmailForm = true;
    }
    else {
      this.checkEmailForm = false;
    }
  }

  makeid(length: number) {// random chuỗi device_id
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
}
