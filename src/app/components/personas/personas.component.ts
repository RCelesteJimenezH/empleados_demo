import { Component, OnInit } from '@angular/core';
import { Persona } from '../../models/persona.model';
import { PersonasService } from '../../services/personas.service';
import { TableColumn } from '../../models/table-column';
import { TableConfig } from '../../models/table-config';
import { CrudEventService } from 'src/app/services/crud-event.service';
import { MatDialog } from '@angular/material/dialog';
import { EditFormPersonaComponent } from '../Edit-form/edit-form-persona/edit-form-persona.component';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent implements OnInit {
  caseId: string = 'persona';
  tableColumns: TableColumn[] = [];
  personas: Persona[] = [];
  totalPersonas: number = 0;
  tableConfig: TableConfig = {
    isSelectable: false,
    isPaginable: true,
    isFilterable: true,
  };

  constructor(
    private personasService: PersonasService,
    private crudEventService: CrudEventService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.setTableColumns();
    this.getPersonas();
  }

  getPersonas(): void {
    this.personas = this.personasService.getPersonas();
    this.totalPersonas = this.personasService.getTotalPersonas();
  }

  onSelect(data: any) {
    console.log(data);
  }

  setTableColumns() {
    this.tableColumns = [
      { label: 'Acciones', def: 'acciones', dataKey: 'acciones', dataType: 'object', actions: true },
      { label: 'ID', def: 'id', dataKey: 'id', dataType: 'object' },
      { label: 'Nombre', def: 'persona.nombre', dataKey: 'persona.nombre', dataType: 'object' },
      { label: 'Apellido', def: 'persona.apellido', dataKey: 'persona.apellido', dataType: 'object' },
      { label: 'Fecha de Nacimiento', def: 'persona.fechaNacimiento', dataKey: 'persona.fechaNacimiento', dataType: 'object', formatt: 'dd MMM yyyy' },
    ];
  }

  deletePersona(row: Persona) {
    this.personas = this.personas.filter((persona) => persona.id !== row.id);
    this.totalPersonas = this.personas.length;
    this.personasService.eliminarPersona(row.id);
    this.getPersonas();
    this.crudEventService.notifyDataChanged();
  }

  editPersona(personaEditada: Persona) {
    const dialogRef = this.dialog.open(EditFormPersonaComponent, {
      width: '600px',
      data: {
        persona: personaEditada,
        modalTitle: 'Editar Registro',
        submitButtonText: 'Guardar Cambios'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Resultado del diálogo:', result);
        this.getPersonas();
        this.crudEventService.notifyDataChanged();
      }
    });
  }

}
