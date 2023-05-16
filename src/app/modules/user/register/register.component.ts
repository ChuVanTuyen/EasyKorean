import { Component, OnInit } from '@angular/core';
import { ApiRegisterService } from 'src/app/services/api/api-register.service';
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
  message: any;

  constructor(private apiRegister: ApiRegisterService, private lang: LanguageService) { }

  ngOnInit(): void {
    if (this.user.email) {
      console.log(this.user);
    }
  }

  onRegister(userData: UserFormData): void {
    this.user = userData;
    this.validateEmail(this.user.email);
    if (!this.checkEmailForm || this.user.password.length < 6 || this.user.password !== this.user.rePassword) {
      return;
    }
    this.apiRegister.register({// đăng ký lên serve
      email: this.user.email,
      password: this.user.password,
      language: this.lang.lang
    }).subscribe(data => {
      this.message = data;
      console.log(this.message);
    });
  }

  removeWarnForm(event: Event, type: number): void {// kiểm tra cảnh báo đỏ khi người dùng nhập
    if (type === 0) {// khi người dùng nhập email
      this.user.email = (event.target as HTMLInputElement).value;
      this.validateEmail(this.user.email);
    }
    if (type === 1) {// đỏ khi người dùng nhập mật khẩu
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
}
