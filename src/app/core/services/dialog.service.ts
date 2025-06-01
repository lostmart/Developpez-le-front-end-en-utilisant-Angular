// dialog.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private openDialogSubject = new Subject<void>(); // changed from BehaviorSubject<boolean>
  openDialog$ = this.openDialogSubject.asObservable();

  triggerOpenDialog() {
    this.openDialogSubject.next(); // emit event
  }
}
