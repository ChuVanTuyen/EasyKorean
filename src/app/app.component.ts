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
  constructor(@Inject(PLATFORM_ID) platformId: Object,
    public lang: LanguageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  ngOnInit(): void {
    let url = window.location.href.slice(schemeDomain.length);
    let lang = url.split('/')[0];
    if (this.lang.checkLang(lang)) {
      this.lang.setLang(lang);
    } else {
      url = url.slice(lang.length);
      lang = navigator.language;
      this.lang.setLang(lang);
      url = lang + url;
    }
    this.router.navigate([url]);
  }
}
