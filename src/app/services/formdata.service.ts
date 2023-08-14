import { Injectable } from '@angular/core';
import { PuestosService } from './puestos.service';
import { PersonasService } from './personas.service';
import { EmpleadosPuestosService } from './empleados-puestos.service';
import { CrudEventService } from './crud-event.service';


@Injectable({
  providedIn: 'root'
})

export class FormDataService {
  constructor(private puestosService: PuestosService,
    private personasService: PersonasService,
    private empleadosPuestosService: EmpleadosPuestosService,
    private crudEventService: CrudEventService
  ) { }

  enviarFormulario(formularioData: any, servicioDestino: string) {
    switch (servicioDestino) {
      case 'puesto':
        const dataToSend = {
          id: formularioData.Id,
          nombre: formularioData.Puesto
        };
        console.log(dataToSend);
        this.puestosService.agregarPuestoConSiguienteId(dataToSend);
        this.crudEventService.notifyDataChanged();
        break;
      case 'persona':
        const fechaNacimiento = new Date(formularioData.FechaNacimiento);
        const dia = fechaNacimiento.getDate().toString().padStart(2, '0');
        const mes = (fechaNacimiento.getMonth() + 1).toString().padStart(2, '0');
        const anio = fechaNacimiento.getFullYear();

        const personaData = {
          nombre: formularioData.Nombre,
          apellido: formularioData.Apellido,
          fechaNacimiento: `${dia}/${mes}/${anio}`,
        };

        this.personasService.agregarPersonaConSiguienteId(personaData);
        this.crudEventService.notifyDataChanged();
        break;


      case 'empleados-puestos':
        console.log(formularioData);
        const persona = this.personasService.obtenerPersonaPorId(formularioData.ID);
        const puesto = this.puestosService.obtenerPuesto(formularioData.Puesto);

        if (persona && puesto) {
          const empleadoPuestoData = {
            persona: persona,
            puesto: puesto,
          };

          this.empleadosPuestosService.agregarEmpleadoPuestoConSiguienteId(empleadoPuestoData);
          this.crudEventService.notifyDataChanged();
        } else {
          console.log('No se encontró la persona o el puesto.');
        }
        break;
      default:
        break;

    }
  }
}

