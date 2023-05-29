import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../views/loader/loader.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormsModule,
    LoaderComponent,
    ReactiveFormsModule
  ]
})
export class GeneralModule { }
