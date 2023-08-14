import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule

import { DynamicFormComponent } from './dynamic-form.component'; // Ajusta la ruta si es necesario
import { DynamicFormQuestionComponent } from '../dynamic-form-question/dynamic-form-question.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [DynamicFormComponent,DynamicFormQuestionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
  ],
  exports: [DynamicFormComponent],
})
export class DynamicFormModule {}