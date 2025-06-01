import { Component } from '@angular/core';
// import { take } from 'rxjs';
// import { OlympicService } from './core/services/olympic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showDialog: boolean = true;
  isClosing = false;

  handleDialogClose(event: boolean): void {
    this.showDialog = event;
  }

  openDialog(): void {
    this.isClosing = true;
    setTimeout(() => {
      this.showDialog = !this.showDialog;
      this.isClosing = false;
    }, 290);
  }

  // ngOnInit(): void {
  //   this.olympicService.loadInitialData().pipe(take(1)).subscribe();
  // }
}
