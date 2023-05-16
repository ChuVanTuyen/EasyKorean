import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './modules/search/search.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { WordResultComponent } from './modules/search/word-result/word-result.component';
import { ExampleResultComponent } from './modules/search/example-result/example-result.component';

const routes: Routes = [
  {
    path: ':lang',
    children: [
      { path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },
      {
        path: 'search', component: SearchComponent, children: [
          { path: 'word/:query', component: WordResultComponent },
          { path: 'example/:query', component: ExampleResultComponent }
        ]
      },
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
