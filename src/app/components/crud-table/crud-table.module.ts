import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CrudTableComponent } from './crud-table.component';
import { ColumnValuePipe } from '../../pipes/column-value.pipe';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { CrudModalModule } from '../crud-modal/crud-modal.module';
import { EditFormModule } from '../Edit-form/edit-form.module';

@NgModule({
  declarations: [CrudTableComponent, ColumnValuePipe, ], // Agrega DynamicFormComponent aquí
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    DynamicFormModule,
    CrudModalModule,
    EditFormModule

  ],
  exports: [CrudTableComponent],
})
export class CrudTableModule {}

