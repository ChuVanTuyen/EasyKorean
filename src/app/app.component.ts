import { Component, OnInit } from '@angular/core';
import { LanguageService } from './services/language.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private lang: LanguageService, private router: Router) { }
  title = 'EasyKorean';

  ngOnInit(): void {
    let url = this.lang.getCurrentLang()?.code;
    this.router.navigate([url]);
  }
}
