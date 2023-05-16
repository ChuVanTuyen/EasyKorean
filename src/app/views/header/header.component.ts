import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Language } from 'src/app/data-structure/Common';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  keepActive: Language | undefined; // đang hiển thị ngôn ngữ nào
  navigatorLang = 'en'; // ngôn ngữ mặc định
  isBrowser = false; // kiểm tra có đang chạy trong môi trường browser hay không
  constructor(@Inject(PLATFORM_ID) platformId: Object,
    public lang: LanguageService,
    private router: Router,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.keepActive = this.lang.getCurrentLang(); // lấy ngôn ngữ mặc định để hiển thị lần đầu
    }
  }

  setLanguge(lang: Language): void {
    this.keepActive = lang;
    this.lang.setLang(this.keepActive.code);// thay đổi ngôn ngữ
  }
}
