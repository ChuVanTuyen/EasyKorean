import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { WordResultComponent } from './word-result/word-result.component';
import { ExampleResultComponent } from './example-result/example-result.component';
import { NoSearchComponent } from './no-search/no-search.component';
import { SearchComponent } from './search.component';
import { GeneralModule } from 'src/app/modules/general.module';

const routes: Routes = [
  {
    path: '', component: SearchComponent, children: [
      { path: 'word/:query', component: WordResultComponent },
      { path: 'example/:query', component: ExampleResultComponent }
    ]
  },

];

@NgModule({
  declarations: [
    SearchComponent,
    WordResultComponent,
    ExampleResultComponent,
    NoSearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild({
      extend: true
    }),
    GeneralModule
  ]
})
export class SearchModule { }
