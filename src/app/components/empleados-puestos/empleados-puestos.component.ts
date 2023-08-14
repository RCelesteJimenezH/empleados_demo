import { Component, OnInit } from '@angular/core';
import { EmpleadoPuesto } from '../../models/empleado-puesto.model';
import { EmpleadosPuestosService } from '../../services/empleados-puestos.service';
import { TableColumn } from '../../models/table-column';
import { TableConfig } from '../../models/table-config';
import { CrudEventService } from '../../services/crud-event.service';
import { MatDialog } from '@angular/material/dialog';
import { EditFormEmpleadoPuestoComponent } from '../Edit-form/edit-form-empleado-puesto/edit-form-empleado-puesto.component';

@Component({
  selector: 'app-empleados-puestos',
  templateUrl: './empleados-puestos.component.html',
  styleUrls: ['./empleados-puestos.component.scss']
})
export class EmpleadosPuestosComponent implements OnInit {
  caseId: string = 'empleados-puestos';
  tableColumns: TableColumn[] = [];
  empleadosPuestos: EmpleadoPuesto[] = [];
  totalEmpleadosPuestos: number = 0;
  tableConfig: TableConfig = {
    isSelectable: false,
    isPaginable: true,
    isFilterable: true,
  };

  constructor(
    private empleadosPuestosService: EmpleadosPuestosService,
    private crudEventService: CrudEventService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.setTableColumns();
    this.getEmpleadosPuestos();
  }

  getEmpleadosPuestos(): void {
    this.empleadosPuestos = this.empleadosPuestosService.getEmpleadosPuestos();
    this.totalEmpleadosPuestos = this.empleadosPuestosService.getTotalEmpleadosPuestos();
  }
  
  onSelect(data: any) {
    console.log(data);
  }

  setTableColumns() {
    this.tableColumns = [
      { label: 'Acciones', def: 'acciones', dataKey: 'acciones', dataType: 'object', actions: true },
      { label: 'ID', def: 'id', dataKey: 'id', dataType: 'object' },
      { label: 'Nombre', def: 'persona.nombre', dataKey: 'empleadosPuestos.persona.nombre', dataType: 'object' },
      { label: 'Apellido', def: 'persona.apellido', dataKey: 'empleadosPuestos.persona.apellido', dataType: 'object' },
      { label: 'Fecha de Nacimiento', def: 'persona.fechaNacimiento', dataKey: 'empleadosPuestos.persona.fechaNacimiento', dataType: 'object', formatt: 'dd MMM yyyy' },
      { label: 'Puesto', def: 'puesto.nombre', dataKey: 'empleadosPuestos.puesto.nombre', dataType: 'object' },
    ];
  }

  deleteEmpleadoPuesto(row: EmpleadoPuesto) {
    this.empleadosPuestos = this.empleadosPuestos.filter((empleado) => empleado.id !== row.id);
    this.totalEmpleadosPuestos = this.empleadosPuestos.length;
    this.empleadosPuestosService.eliminarEmpleadoPuesto(row.id);
    this.getEmpleadosPuestos();
    this.crudEventService.notifyDataChanged();
  }

  editEmpleadoPuesto(empleadoPuestoEditado: EmpleadoPuesto) {
    const dialogRef = this.dialog.open(EditFormEmpleadoPuestoComponent, {
      width: '600px',
      data: {
        empleadoPuesto: empleadoPuestoEditado,
        modalTitle: 'Editar Empleado y Puesto',
        submitButtonText: 'Guardar Cambios'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Resultado del diálogo:', result);
        this.getEmpleadosPuestos();
        this.crudEventService.notifyDataChanged();
      }
    });
  }

}
