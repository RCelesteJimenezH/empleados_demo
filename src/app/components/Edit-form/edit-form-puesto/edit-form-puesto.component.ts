import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Puesto } from '../../../models/puesto.model';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PuestosService } from 'src/app/services/puestos.service';

@Component({
  selector: 'app-edit-form-puesto',
  templateUrl: './edit-form-puesto.component.html',
  styleUrls: ['./edit-form-puesto.component.scss']
})

export class EditFormPuestoComponent {

  puestoForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditFormPuestoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private puestosService: PuestosService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.puestoForm = this.formBuilder.group({
      id: [this.data.puesto.id],
      nombre: [this.data.puesto.nombre, Validators.required],
    });
  }

  saveChanges(): void {
    if (this.puestoForm.valid && this.data && this.data.puesto) {
      const updatedPuesto: Puesto = {
        id: this.data.puesto.id,
        nombre: this.data.puesto.nombre,
      };

      this.dialogRef.close(updatedPuesto);
    }
  }

  async onSave() {
    console.log(this.puestoForm.getRawValue());
  
    try {
      const puestoEditado: Puesto = {
        id: this.puestoForm.getRawValue().id,
        nombre: this.puestoForm.getRawValue().nombre
      };
      
      await this.puestosService.editarPuesto(puestoEditado);
      
      this.dialog.closeAll();
      this.puestosService.getPuestos();
    } catch (error) {
      console.error("Error editing puesto:", error);
    }
  }
  
  
  onCancel() {
    this.dialog.closeAll();
  }
}
