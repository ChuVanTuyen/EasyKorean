import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { Language } from 'src/app/data-structure/Common';
import { User } from 'src/app/data-structure/User';
import { ApiUserService } from 'src/app/services/api/api-user.service';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { LanguageService } from 'src/app/services/language.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  keepActive: Language | undefined; // đang hiển thị ngôn ngữ nào
  isBrowser = false; // kiểm tra có đang chạy trong môi trường browser hay không
  user = {
    id: NaN,
    email: '',
    name: '',
    password: '',
    image: '',
    device_id: '',
    remember_token: ''
  };
  logoutOrRegister = "";
  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    public lang: LanguageService,
    private localStorage: LocalStorageService,
    private broadCaster: BroadcastService,
    private apiUser: ApiUserService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.keepActive = this.lang.getCurrentLang(); // lấy ngôn ngữ mặc định để hiển thị lần đầu
      let data = this.localStorage.getItem('user');
      if (data) {
        this.user = data;
      }
      this.broadCaster.on<any>('user').subscribe((data) => {

        this.user = data.user;
        this.localStorage.setItem('user', this.user);
        this.logoutOrRegister = data.logoutOrRegister;
      });
    }
  }

  setLanguge(lang: Language): void {
    this.keepActive = lang;
    this.lang.setLang(this.keepActive.code);// thay đổi ngôn ngữ
  }

  handleLogout(): void {// đăng xuất
    this.apiUser.logout(
      {
        device_id: this.user.device_id,
      },
      {
        headers: {
          authorization: this.user.remember_token
        }
      }
    ).subscribe((data) => {
      if (data.status === 0) {
        console.error("Đăng xuất thất bại");
      } else {
        this.user.id = NaN;
        this.user.name = '';
        this.user.device_id = '';
        this.user.remember_token = '';
        this.user.image = '';
        this.logoutOrRegister = "Sign-out";
        this.localStorage.setItem('user', this.user);
      }
    })
  }
}
