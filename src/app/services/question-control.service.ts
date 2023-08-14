import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { QuestionBase } from '../models/question-base.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionControlService {
  constructor() {}

  toFormGroup(questions: QuestionBase<string>[]) {
    const group: any = {};
  
    questions.forEach(question => {
      const validators: ValidatorFn[] = [];
  
      if (question.required) {
        validators.push(Validators.required);
      }
  
      if (this.whitespaceValidator) {
        validators.push(this.whitespaceValidator);
      }
  
      group[question.key] = new FormControl(question.value || '', validators);
    });
  
    return new FormGroup(group);
  }
  

  whitespaceValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (typeof control.value === 'string' || typeof control.value === 'number') {
      const stringValue = typeof control.value === 'number' ? control.value.toString() : control.value;
      if (stringValue.trim().length === 0) {
        return { whitespace: true };
      }
    }
    return null;
  }
  
}
