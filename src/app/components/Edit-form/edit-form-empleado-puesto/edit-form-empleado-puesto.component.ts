import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EmpleadoPuesto } from '../../../models/empleado-puesto.model';
import { PersonasService } from 'src/app/services/personas.service';
import { PuestosService } from 'src/app/services/puestos.service';
import { CrudEventService } from 'src/app/services/crud-event.service';
import { EmpleadosPuestosService } from 'src/app/services/empleados-puestos.service';

@Component({
  selector: 'app-edit-form-empleado-puesto',
  templateUrl: './edit-form-empleado-puesto.component.html',
  styleUrls: ['./edit-form-empleado-puesto.component.scss'],
})

export class EditFormEmpleadoPuestoComponent implements OnInit {
  empleadoPuestoForm!: FormGroup;
  personas: any[] = [];
  puestos: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditFormEmpleadoPuestoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private personasService: PersonasService,
    private puestosService: PuestosService,
    private crudEventService: CrudEventService,
    private empleadosPuestosService: EmpleadosPuestosService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.loadPersonas();
    this.loadPuestos();
  }

  private buildForm(): void {
    this.empleadoPuestoForm = this.formBuilder.group({
      id: [this.data.empleadoPuesto.id],
      personaId: [this.data.empleadoPuesto.persona.id, Validators.required],
      puestoNombre: [this.data.empleadoPuesto.puesto.nombre, Validators.required],
    });
  }

  async loadPersonas() {
    try {
      this.personas = await this.personasService.getPersonas();
    } catch (error) {
      console.error("Error loading personas:", error);
    }
  }

  async loadPuestos() {
    try {
      this.puestos = await this.puestosService.getPuestos();
    } catch (error) {
      console.error("Error loading puestos:", error);
    }
  }

  saveChanges(): void {
    if (this.empleadoPuestoForm.valid && this.data && this.data.empleadoPuesto) {
      const updatedEmpleadoPuesto: EmpleadoPuesto = {
        id: this.data.empleadoPuesto.id,
        persona: this.personas.find(persona => persona.id === this.empleadoPuestoForm.value.personaId),
        puesto: this.puestos.find(puesto => puesto.nombre === this.empleadoPuestoForm.value.puestoNombre),
      };

      this.dialogRef.close(updatedEmpleadoPuesto);
    }
  }

  async onSave() {
    try {
      const empleadoPuestoEditado: EmpleadoPuesto = {
        id: this.data.empleadoPuesto.id,
        persona: this.personas.find(persona => persona.id === this.empleadoPuestoForm.value.personaId),
        puesto: this.puestos.find(puesto => puesto.nombre === this.empleadoPuestoForm.value.puestoNombre),
      };

      await this.empleadosPuestosService.editarEmpleadoPuesto(this.data.empleadoPuesto.id, empleadoPuestoEditado);

      this.dialogRef.close();
      this.crudEventService.notifyDataChanged();
    } catch (error) {
      console.error("Error editing empleado puesto:", error);
    }
  }


  onCancel() {
    this.dialogRef.close();
  }
}
