import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../data-structure/Common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  langs = [
    { id: 0, name: 'Vietnamese', img: "assets/images/flag/vietnam.png", code: 'vi' },
    { id: 1, name: 'English', img: "assets/images/flag/united-kingdom.png", code: 'en' }
  ];
  lang = 'en';
  constructor(
    private translate: TranslateService,
    private router: Router
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('en');
  }

  setLang(lang: string): void {
    this.lang = lang;
    this.translate.use(lang);
    let url = lang + location.pathname.slice(location.pathname.split('/')[1].length + 1);
    this.router.navigate([url])
  }

  setLangDefault(lang: string): void {
    this.translate.setDefaultLang(lang);
  }

  getCurrentLang(): Language | undefined {
    return this.langs.find(item => item.code === this.lang);
  }

  getLangs(): Array<Language> {
    return this.langs;
  }

  checkLang(lang: string): boolean {
    return this.langs.some(item => item.code === lang);
  }
}
