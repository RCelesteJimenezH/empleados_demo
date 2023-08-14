import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuestionService } from '../../services/question.service';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../../models/question-base.model';

@Component({
  selector: 'app-crud-modal',
  templateUrl: './crud-modal.component.html',
  styleUrls: ['./crud-modal.component.scss']
})
export class CrudModalComponent {
  questions: QuestionBase<string>[] = [];
  caseId: string = '';
  constructor(
    public dialogRef: MatDialogRef<CrudModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(QuestionService) private questionService: QuestionService
  ) {}
  
  ngOnInit() {
    this.caseId=this.data.caseId;
    this.questionService.getQuestions(this.caseId).subscribe((questions: QuestionBase<string>[]) => {
      this.questions = questions;
    });
  }
}
