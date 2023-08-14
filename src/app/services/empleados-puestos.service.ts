import { Injectable } from '@angular/core';
import { EmpleadoPuesto } from '../models/empleado-puesto.model';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosPuestosService {
  private empleadosPuestos: EmpleadoPuesto[] = [];

  constructor() {
    this.initData();
  }

  private initData(): void {
    const data = localStorage.getItem('empleadosPuestos');
    if (!data) {
      this.empleadosPuestos = [
        {
          id: 1,
          puesto: { id: 1, nombre: 'Abogado' },
          persona: { id: 1, nombre: 'Andrea', apellido: 'Abreu', fechaNacimiento: '01/08/1999' }
        },
        {
          id: 2,
          puesto: { id: 2, nombre: 'Economista' },
          persona: { id: 2, nombre: 'Liliana', apellido: 'Zurita', fechaNacimiento: '13/05/1999' }
        }
      ];
      this.guardarDatos();
    } else {
      this.empleadosPuestos = JSON.parse(data);
    }
  }

  getEmpleadosPuestos(): EmpleadoPuesto[] {
    return this.empleadosPuestos;
  }

  getTotalEmpleadosPuestos(): number {
    return this.empleadosPuestos.length;
  }

  generarSiguienteId(): number {
    if (this.empleadosPuestos.length === 0) {
      return 1;
    }

    const ids = this.empleadosPuestos.map(empleadoPuesto => empleadoPuesto.id);
    const maxId = Math.max(...ids);

    for (let i = 1; i <= maxId + 1; i++) {
      if (!ids.includes(i)) {
        return i;
      }
    }

    return maxId + 1;
  }

  agregarEmpleadoPuestoConSiguienteId(empleadoPuesto: Omit<EmpleadoPuesto, 'id'>): void {
    const siguienteId = this.generarSiguienteId();
    const nuevoEmpleadoPuesto: EmpleadoPuesto = {
      id: siguienteId,
      persona: empleadoPuesto.persona,
      puesto: empleadoPuesto.puesto,
    };
    console.log("ID:", siguienteId);
    console.log("Nuevo empleado puesto agregado:", nuevoEmpleadoPuesto);
    this.empleadosPuestos.push(nuevoEmpleadoPuesto);
    this.guardarDatos();
  }

  eliminarEmpleadoPuesto(id: number): void {
    const index = this.empleadosPuestos.findIndex(empleadoPuesto => empleadoPuesto.id === id);
    if (index !== -1) {
      this.empleadosPuestos.splice(index, 1);
      this.guardarDatos();
      console.log("Empleado Puesto eliminado con ID:", id);
    }
  }

  private guardarDatos(): void {
    localStorage.setItem('empleadosPuestos', JSON.stringify(this.empleadosPuestos));
  }

  editarEmpleadoPuesto(id: number, nuevoEmpleadoPuesto: EmpleadoPuesto): void {
    const index = this.empleadosPuestos.findIndex(empleadoPuesto => empleadoPuesto.id === id);
    if (index !== -1) {
      const empleadoPuestoEditado: EmpleadoPuesto = {
        id,
        persona: nuevoEmpleadoPuesto.persona,
        puesto: nuevoEmpleadoPuesto.puesto,
      };
      this.empleadosPuestos[index] = empleadoPuestoEditado;
      this.guardarDatos();
      console.log("Empleado Puesto editado con ID:", id);
    }
  }
 

}
