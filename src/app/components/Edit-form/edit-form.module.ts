import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { EditFormEmpleadoPuestoComponent } from './edit-form-empleado-puesto/edit-form-empleado-puesto.component';
import { EditFormPersonaComponent } from './edit-form-persona/edit-form-persona.component';
import { EditFormPuestoComponent } from './edit-form-puesto/edit-form-puesto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    EditFormEmpleadoPuestoComponent,
    EditFormPersonaComponent,
    EditFormPuestoComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  exports: [
    EditFormEmpleadoPuestoComponent,
    EditFormPersonaComponent,
    EditFormPuestoComponent
  ]
})
export class EditFormModule { }
