import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../views/loader/loader.component';


@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormsModule,
    LoaderComponent
  ]
})
export class GeneralModule { }
