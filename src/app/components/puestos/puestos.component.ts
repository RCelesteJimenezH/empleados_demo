import { Component, OnInit } from '@angular/core';
import { Puesto } from '../../models/puesto.model';
import { PuestosService } from '../../services/puestos.service';
import { TableColumn } from '../../models/table-column';
import { TableConfig } from '../../models/table-config';
import { CrudEventService } from '../../services/crud-event.service';
import { EditFormPuestoComponent } from '../Edit-form/edit-form-puesto/edit-form-puesto.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-puestos',
  templateUrl: './puestos.component.html',
  styleUrls: ['./puestos.component.scss']
})
export class PuestosComponent implements OnInit {
  caseId: string = 'puesto';
  tableColumns: TableColumn[] = [];
  puestos: Puesto[] = [];
  totalPuestos: number = 0;
  tableConfig: TableConfig = {
    isSelectable: false,
    isPaginable: true,
    isFilterable: true,
  };

  constructor(
    private puestosService: PuestosService,
    private crudEventService: CrudEventService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.setTableColumns();
    this.getPuestos();
  }

  getPuestos(): void {
    this.puestos = this.puestosService.getPuestos();
    this.totalPuestos = this.puestosService.getTotalPuestos();
  }

  onSelect(data: any) {
    console.log(data);
  }

  setTableColumns() {
    this.tableColumns = [
      { label: 'Acciones', def: 'acciones', dataKey: 'acciones', dataType: 'object', actions: true },
      { label: 'ID', def: 'id', dataKey: 'id', dataType: 'object' },
      { label: 'Puesto', def: 'puesto.nombre', dataKey: 'puesto.nombre', dataType: 'object' },
    ];
  }

  deletePuesto(row: Puesto) {
    this.puestos = this.puestos.filter((puesto) => puesto.id !== row.id);
    this.totalPuestos = this.puestos.length;
    this.puestosService.eliminarPuesto(row.id);
    this.getPuestos();
    this.crudEventService.notifyDataChanged();
  }
  editPuesto(puestoEditado: Puesto) {
    const dialogRef = this.dialog.open(EditFormPuestoComponent, {
      width: '600px',
      data: {
        puesto: puestoEditado,
        modalTitle: 'Editar Registro',
        submitButtonText: 'Guardar Cambios'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Resultado del diálogo:', result);
        this.getPuestos();
        this.crudEventService.notifyDataChanged();
      }
    });
  }
}


