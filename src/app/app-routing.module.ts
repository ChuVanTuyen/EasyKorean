import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './views/not-found/not-found.component';

const routes: Routes = [
  {
    path: ':lang',
    children: [
      { path: 'user', loadChildren: () => import('./views/user/user.module').then(m => m.UserModule) },
      { path: 'search', loadChildren: () => import('./views/search/search.module').then(m => m.SearchModule) },
      { path: '', redirectTo: 'search', pathMatch: 'full' }
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
