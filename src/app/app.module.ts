import { NgModule } from '@angular/core';
import { BrowserModule, TransferState } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './views/header/header.component';
import { FooterComponent } from './views/footer/footer.component';
import { SearchComponent } from './modules/search/search.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { translateBrowserLoaderFactory } from './loader/translate-browser.loader';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { WordResultComponent } from './modules/search/word-result/word-result.component';
import { ExampleResultComponent } from './modules/search/example-result/example-result.component';
import { NoResultComponent } from './modules/search/no-result/no-result.component';
import { FormsModule } from '@angular/forms';
import { NoSearchComponent } from './modules/search/no-search/no-search.component';
import { LoaderComponent } from './views/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    NotFoundComponent,
    WordResultComponent,
    ExampleResultComponent,
    NoResultComponent,
    NoSearchComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateBrowserLoaderFactory,
        deps: [HttpClient, TransferState]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
