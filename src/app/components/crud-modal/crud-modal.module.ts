import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { CrudModalComponent } from './crud-modal.component'; // Asegúrate de que la ruta sea correcta
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CrudModalComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        DynamicFormModule,
        MatFormFieldModule,
        MatDialogModule,
        FormsModule, // Agrega FormsModule
        ReactiveFormsModule, // Agrega ReactiveFormsModule

    ],
    exports: [CrudModalComponent],
})
export class CrudModalModule { }
