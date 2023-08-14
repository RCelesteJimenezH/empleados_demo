import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../../models/question-base.model';
import { QuestionControlService } from '../../services/question-control.service';
import { MatDialog } from '@angular/material/dialog'; 
import { FormDataService } from '../../services/formdata.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() caseId: string = '';
  @Input() questions: QuestionBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';

  constructor(
    private qcs: QuestionControlService,
    private dialog: MatDialog,
    private formDataService: FormDataService
  ) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
  }

  onSubmit() {
  }

  onCancel() {
    this.dialog.closeAll(); 
  }
  onSave(){
    this.dialog.closeAll(); 
    this.formDataService.enviarFormulario(this.form.getRawValue(), this.caseId); 
  }
}

