import { Injectable } from '@angular/core';
import { DropdownQuestion } from '../models/dropdown-question.module';
import { QuestionBase } from '../models/question-base.model';
import { TextboxQuestion } from '../models/textbox-question.module';
import { of, Observable } from 'rxjs';
import { DatepickerQuestion } from '../models/datepicker-question.module';
import { PuestosService } from './puestos.service';
import { PersonasService } from './personas.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private puestosService: PuestosService, private personasService: PersonasService) { }
  getQuestions(caseId: string): Observable<QuestionBase<string>[]> {
    let questions: QuestionBase<string>[] = [];

    switch (caseId) {
      case 'empleados-puestos':
        const puestoOptions = this.puestosService.getPuestos().map(puesto => ({
          key: puesto.nombre.toLowerCase(),
          value: puesto.nombre
        }));
        
        const personaOptions = this.personasService.getPersonas().map(persona => ({
          key: persona.id.toString(),
          value: persona.id.toString()
        }));

        questions = [
          new DropdownQuestion({
            key: 'ID',
            label: 'ID de persona',
            required: true,
            order: 1,
            options: personaOptions,
          }),
          new DropdownQuestion({
            key: 'Puesto',
            label: 'Puesto',
            required: true,
            order: 3,
            options: puestoOptions
          })
        ];
        break;
      case 'persona':
        questions = [
          new TextboxQuestion({
            key: 'Nombre',
            label: 'Nombre',
            value: '',
            required: true,
            order: 2
          }),
          new TextboxQuestion({
            key: 'Apellido',
            label: 'Apellido',
            value: '',
            required: true,
            order: 3
          }),
          new DatepickerQuestion({
            key: 'FechaNacimiento',
            label: 'Fecha de Nacimiento',
            value: '',
            required: true,
            order: 4
          }),
        ];
        break;

      case 'puesto':
        questions = [
          new TextboxQuestion({
            key: 'Puesto',
            label: 'Puesto',
            required: true,
            order: 2
          }),
        ];
        break;

        break;
    }
    return of(questions.sort((a, b) => a.order - b.order));
  }
}

