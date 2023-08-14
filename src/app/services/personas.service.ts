import { Injectable } from '@angular/core';
import { Persona } from '../models/persona.model';
import { BehaviorSubject } from 'rxjs';
import { EmpleadosPuestosService } from './empleados-puestos.service';
import { EmpleadoPuesto } from '../models/empleado-puesto.model';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  private personas: Persona[] = [];
  private personaSubject: BehaviorSubject<Persona[]> = new BehaviorSubject<Persona[]>([]);

  constructor(
    private empleadosPuestosService: EmpleadosPuestosService,

  ) {
    this.initData();
  }

  private initData(): void {
    const data = localStorage.getItem('personas');
    if (!data) {
      this.personas = [
        { id: 1, nombre: 'Andrea', apellido: 'Abreu', fechaNacimiento: '01/08/1999' },
        { id: 2, nombre: 'Liliana', apellido: 'Zurita', fechaNacimiento: '13/05/1999' }
      ];
      this.guardarDatos();
    } else {
      this.personas = JSON.parse(data);
    }
    this.personaSubject.next(this.personas);
  }

  getPersonas(): Persona[] {
    return this.personas;
  }
  obtenerPersonaPorNombreApellido(nombre: string, apellido: string): Persona | undefined {
    const personaEncontrada = this.personas.find(persona => persona.nombre === nombre && persona.apellido === apellido);
    console.log("persona encontrada", personaEncontrada);
    return personaEncontrada;
  }
  obtenerPersonaPorId(id: string | number): Persona | undefined {
    const idNumerico = typeof id === 'string' ? parseInt(id, 10) : id;
    const personaEncontrada = this.personas.find(persona => persona.id === idNumerico);

    if (personaEncontrada) {
      console.log("Persona encontrada:", personaEncontrada);
    } else {
      console.log("Persona no encontrada para el ID:", id);
    }

    return personaEncontrada;
  }

  getTotalPersonas(): number {
    return this.personas.length;
  }

  generarSiguienteId(): number {
    if (this.personas.length === 0) {
      return 1;
    }

    const ids = this.personas.map(persona => persona.id);
    const maxId = Math.max(...ids);

    for (let i = 1; i <= maxId + 1; i++) {
      if (!ids.includes(i)) {
        return i;
      }
    }

    return maxId + 1;
  }

  agregarPersonaConSiguienteId(persona: Omit<Persona, 'id'>): void {
    const siguienteId = this.generarSiguienteId();
    const nuevaPersona: Persona = {
      id: siguienteId,
      nombre: persona.nombre,
      apellido: persona.apellido,
      fechaNacimiento: persona.fechaNacimiento,
    };
    console.log("iD :", this.generarSiguienteId());
    console.log("Nueva persona agregada:", nuevaPersona);
    this.personas.push(nuevaPersona);
    this.guardarDatos();
  }
  private guardarDatos(): void {
    localStorage.setItem('personas', JSON.stringify(this.personas));
  }


  eliminarPersona(id: number): void {
    const personaEliminada = this.personas.find(persona => persona.id === id);
    if (personaEliminada) {
      const empleadosPuestosAEliminar = this.empleadosPuestosService.getEmpleadosPuestos()
        .filter(empleadoPuesto => empleadoPuesto.persona.id === id);
      empleadosPuestosAEliminar.forEach(empleadoPuesto => {
        this.empleadosPuestosService.eliminarEmpleadoPuesto(empleadoPuesto.id);
      });
      const index = this.personas.findIndex(persona => persona.id === id);
      if (index !== -1) {
        this.personas.splice(index, 1);
        this.guardarDatos();
        console.log("Persona eliminada con ID:", id);
      }
    }
  }

  editarPersona(personaEditada: Persona): void {
    const index = this.personas.findIndex(persona => persona.id === personaEditada.id);

    if (index !== -1) {
      this.personas[index] = personaEditada;

      const empleadosPuestosAActualizar = this.empleadosPuestosService.getEmpleadosPuestos()
        .filter(empleadoPuesto => empleadoPuesto.persona.id === personaEditada.id);

      empleadosPuestosAActualizar.forEach(empleadoPuesto => {
        const nuevoEmpleadoPuesto: EmpleadoPuesto = {
          id: empleadoPuesto.id,
          persona: personaEditada,
          puesto: empleadoPuesto.puesto,
        };
        this.empleadosPuestosService.editarEmpleadoPuesto(empleadoPuesto.id, nuevoEmpleadoPuesto);
      });

      this.guardarDatos();
      console.log("Información de persona y empleados puestos actualizada:", personaEditada);
    }
  }

}
