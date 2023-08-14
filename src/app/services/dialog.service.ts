import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CrudModalComponent } from '../components/crud-modal/crud-modal.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openCrudModal(data: any): MatDialogRef<CrudModalComponent> {
    return this.dialog.open(CrudModalComponent, {
      width: '600px',
      data: data
    });
  }

  closeCrudModal(dialogRef: MatDialogRef<CrudModalComponent, any>) {
    dialogRef.close();
  }
}
