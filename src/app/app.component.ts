import { Component, OnInit, OnDestroy } from '@angular/core';
import { DialogService } from './core/services/dialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  showDialog: boolean = false;
  isClosing = false;
  private subscription = new Subscription();

  constructor(private dialogService: DialogService) {}

  handleDialogClose(event: boolean): void {
    this.showDialog = event;
  }

  openDialog(): void {
    this.isClosing = true;
    setTimeout(() => {
      this.showDialog = true;
      this.isClosing = false;
    }, 290);
  }

  ngOnInit(): void {
    const sub = this.dialogService.openDialog$.subscribe(() =>
      this.openDialog()
    );
    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
