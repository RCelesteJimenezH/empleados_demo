import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from '../../models/table-column';
import { TableConfig } from '../../models/table-config';
import { FormGroup, FormBuilder } from '@angular/forms';
import { QuestionBase } from '../../models/question-base.model';
import { QuestionService } from '../../services/question.service';
import { MatDialog } from '@angular/material/dialog';
import { CrudModalComponent } from '../crud-modal/crud-modal.component';
import { CrudEventService } from '../../services/crud-event.service';

@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.scss']
})

export class CrudTableComponent implements OnInit, AfterViewInit {
  @Input() caseId: string = '';
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() set data(data: Array<any>) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }
  @Input() set columns(columns: TableColumn[]) {
    this.tableColumns = columns;
    this.tableDisplayColumns = this.tableColumns.map((col) => col.def);
  }
  @Input() set config(config: TableConfig) {
    this.setConfig(config);
  }

  dataSource: MatTableDataSource<Array<any>> = new MatTableDataSource();
  tableDisplayColumns: string[] = [];
  tableColumns: TableColumn[] = [];
  selection = new SelectionModel<any>(true, []);
  tableConfig: TableConfig | undefined;
  myFormGroup!: FormGroup;
  questions: QuestionBase<string>[] = [];
  initialValues: any;

  constructor(
    @Inject(QuestionService) private questionService: QuestionService,
    private dialog: MatDialog,
    private crudEventService: CrudEventService
  ) { }

  ngOnInit() {
    this.questionService.getQuestions(this.caseId).subscribe((questions: QuestionBase<string>[]) => {
      this.questions = questions;
    });

    this.crudEventService.dataChanged$.subscribe(() => {
      console.log('Data changed in child component');
      this.reloadDataFromService();
    });
  }

  reloadDataFromService() {
    console.log("cambioa la data");
    this.dataSource.data = this.dataSource.data;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  openAddFormDialog() {
    const dialogRef = this.dialog.open(CrudModalComponent, {
      width: '600px',
      data: {
        caseId: this.caseId,
        initialValues: {},
        modalTitle: 'Agregar Nuevo Registro',
        submitButtonText: 'Agregar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  setConfig(config: TableConfig) {
    this.tableConfig = config;
  }

  hasActions(column: TableColumn) {
    return column.def === 'acciones';
  }

  deleteRow(row: any) {
    this.delete.emit(row);
  }

  editRow(row: any) {
    this.edit.emit(row);
  }
}