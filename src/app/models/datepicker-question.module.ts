import { QuestionBase } from './question-base.model';

export class DatepickerQuestion extends QuestionBase<string> {
  override controlType = 'datepicker';
  
  constructor(options: {} = {}) {
    super(options);
  }
}
