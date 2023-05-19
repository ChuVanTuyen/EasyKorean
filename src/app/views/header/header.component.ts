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
  navigatorLang = 'en'; // ngôn ngữ mặc định
  isBrowser = false; // kiểm tra có đang chạy trong môi trường browser hay không
  user: User = {
    id: -1,
    name: '',
    email: '',
    image: null,
    device_id: '',
    remember_token: ''
  };
  // user$: Observable<User>;
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
    // this.localStorage.clear();
    if (this.isBrowser) {
      this.keepActive = this.lang.getCurrentLang(); // lấy ngôn ngữ mặc định để hiển thị lần đầu
      let data = this.localStorage.getItem('user');
      if (data) {
        this.user = data;
      } else {
        this.broadCaster.on<User>('user').subscribe((data) => {
          this.user = data;
        });
      }
    }
  }

  setLanguge(lang: Language): void {
    this.keepActive = lang;
    this.lang.setLang(this.keepActive.code);// thay đổi ngôn ngữ
  }

  handleLogout(): void {
    this.apiUser.logout({
      headers: {
        authorization: this.user.remember_token
      }
    },
      {
        type: "all"
      }
    )
      .subscribe((data) => {
        console.log(data);
      })
  }
}
