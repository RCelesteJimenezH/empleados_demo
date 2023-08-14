import { Injectable } from '@angular/core';
import { Puesto } from '../models/puesto.model';
import { BehaviorSubject } from 'rxjs';
import { EmpleadosPuestosService } from './empleados-puestos.service';
import { CrudEventService } from '../services/crud-event.service';
import { EmpleadoPuesto } from '../models/empleado-puesto.model';

@Injectable({
  providedIn: 'root'
})
export class PuestosService {
  private puestos: Puesto[] = [];
  private puestosSubject: BehaviorSubject<Puesto[]> = new BehaviorSubject<Puesto[]>([]);

  constructor(
    private empleadosPuestosService: EmpleadosPuestosService,
    private crudEventService: CrudEventService
  ) {
    this.initData();
  }

  private initData(): void {
    const data = localStorage.getItem('puestos');
    if (!data) {
      this.puestos = [
        { id: 1, nombre: 'Abogado' },
        { id: 2, nombre: 'Economista' }
      ];
      this.guardarDatos();
    } else {
      this.puestos = JSON.parse(data);
    }
    this.puestosSubject.next(this.puestos);
  }

  obtenerPuesto(nombrePuesto: string): Puesto | undefined {
    const puestoEncontrado = this.puestos.find(puesto =>
      puesto.nombre.toLowerCase() === nombrePuesto.toLowerCase()
    );

    if (puestoEncontrado) {
      console.log("Puesto encontrado:", puestoEncontrado);
    } else {
      console.log("Puesto no encontrado");
    }
    return puestoEncontrado;
  }

  getPuestos(): Puesto[] {
    return this.puestos;
  }

  getTotalPuestos(): number {
    return this.puestos.length;
  }

  generarSiguienteId(): number {
    if (this.puestos.length === 0) {
      return 1;
    }
    const ids = this.puestos.map(puesto => puesto.id);
    const maxId = Math.max(...ids);
    for (let i = 1; i <= maxId + 1; i++) {
      if (!ids.includes(i)) {
        return i;
      }
    }
    return maxId + 1;
  }
   private guardarDatos(): void {
    localStorage.setItem('puestos', JSON.stringify(this.puestos));
  }

  agregarPuestoConSiguienteId(puesto: Omit<Puesto, 'id'>): void {
    const siguienteId = this.generarSiguienteId();
    const nuevoPuesto: Puesto = {
      id: siguienteId,
      nombre: puesto.nombre,
    };
    console.log("iD :", this.generarSiguienteId());
    console.log("Nuevo puesto agregado:", nuevoPuesto);
    this.puestos.push(nuevoPuesto);
    this.guardarDatos();
  }

  eliminarPuesto(id: number): void {
    const puestoEliminado = this.puestos.find(puesto => puesto.id === id);

    if (puestoEliminado) {
      const empleadosPuestosAEliminar = this.empleadosPuestosService.getEmpleadosPuestos()
        .filter(empleadoPuesto => empleadoPuesto.puesto.id === id); 
      empleadosPuestosAEliminar.forEach(empleadoPuesto => {
        this.empleadosPuestosService.eliminarEmpleadoPuesto(empleadoPuesto.id);
      });
      const index = this.puestos.findIndex(puesto => puesto.id === id);
      if (index !== -1) {
        this.puestos.splice(index, 1);
        this.guardarDatos();
        console.log("Puesto eliminado con ID:", id);
      }
    }
  }

 

  editarPuesto(puestoEditado: Puesto): void {
    const index = this.puestos.findIndex(puesto => puesto.id === puestoEditado.id);
  
    if (index !== -1) {

      this.puestos[index] = puestoEditado;
      const empleadosPuestosAActualizar = this.empleadosPuestosService.getEmpleadosPuestos()
        .filter(empleadoPuesto => empleadoPuesto.puesto.id === puestoEditado.id);
  
      empleadosPuestosAActualizar.forEach(empleadoPuesto => {
        const nuevoEmpleadoPuesto: EmpleadoPuesto = {
          id: empleadoPuesto.id,
          persona: empleadoPuesto.persona,
          puesto: puestoEditado,
        };
        this.empleadosPuestosService.editarEmpleadoPuesto(empleadoPuesto.id, nuevoEmpleadoPuesto);
      });
  
      this.guardarDatos();
      console.log("Información de puesto y empleados puestos actualizada:", puestoEditado);
    }
  }
  
}


