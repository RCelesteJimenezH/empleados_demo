import { Puesto } from './puesto.model';
import { Persona } from './persona.model';

export interface EmpleadoPuesto {
  id: number;
  puesto: Puesto;
  persona: Persona;
}
