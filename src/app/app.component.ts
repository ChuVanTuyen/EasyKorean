import { AfterContentInit, AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { LanguageService } from './services/language.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { schemeDomain } from './data-structure/Common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'EasyKorean';
  isBrowser = false;
  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    public lang: LanguageService,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  ngOnInit(): void {
    if (this.isBrowser) {
      let url = location.pathname; // /en/search/word/hi
      let lang = url.split('/')[1]; // en
      if (this.lang.checkLang(lang)) {
        this.lang.setLang(lang);
      } else {
        lang = navigator.language; // vi
        this.lang.setLang(lang);
      }
    }
  }
}
