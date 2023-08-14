import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudEventService {
  private dataChangedSource = new Subject<boolean>();

  dataChanged$ = this.dataChangedSource.asObservable();

  notifyDataChanged() {
    this.dataChangedSource.next(true);
  }
}
