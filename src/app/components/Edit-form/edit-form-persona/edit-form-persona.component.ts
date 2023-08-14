import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from '../../../models/persona.model';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PersonasService } from 'src/app/services/personas.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-edit-form-persona',
  templateUrl: './edit-form-persona.component.html',
  styleUrls: ['./edit-form-persona.component.scss']
})

export class EditFormPersonaComponent implements OnInit {

  personaForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditFormPersonaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private personasService: PersonasService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    const fechaNacimientoDate = this.convertirStringADate(this.data.persona.fechaNacimiento);

    this.personaForm = this.formBuilder.group({
      id: [this.data.persona.id],
      nombre: [this.data.persona.nombre, Validators.required],
      apellido: [this.data.persona.apellido, Validators.required],
      fechaNacimiento: [fechaNacimientoDate, Validators.required],
    });
  }


  convertirStringADate(fechaString: string): Date | null {
    const partes = fechaString.split('/');
    if (partes.length === 3) {
      const dia = parseInt(partes[0], 10);
      const mes = parseInt(partes[1], 10) - 1;
      const anio = parseInt(partes[2], 10);
      return new Date(anio, mes, dia);
    }
    return null;
  }

  saveChanges(): void {
    if (this.personaForm.valid && this.data && this.data.persona) {
      const updatedPersona: Persona = {
        id: this.data.persona.id,
        nombre: this.personaForm.value.nombre,
        apellido: this.personaForm.value.apellido,
        fechaNacimiento: this.personaForm.value.fechaNacimiento,
      };

      this.dialogRef.close(updatedPersona);
    }
  }


  async onSave() {
    console.log(this.personaForm.getRawValue());

    try {
      const fechaNacimientoFormatted = formatDate(this.personaForm.getRawValue().fechaNacimiento, 'dd/MM/yyyy', 'en-US'); // Formatea la fecha
      const personaEditada: Persona = {
        id: this.personaForm.getRawValue().id,
        nombre: this.personaForm.getRawValue().nombre,
        apellido: this.personaForm.getRawValue().apellido,
        fechaNacimiento: fechaNacimientoFormatted
      };
      await this.personasService.editarPersona(personaEditada);
      this.dialog.closeAll();
    } catch (error) {
      console.error("Error editing persona:", error);
    }
  }
  onCancel() {
    this.dialog.closeAll();
  }
}
