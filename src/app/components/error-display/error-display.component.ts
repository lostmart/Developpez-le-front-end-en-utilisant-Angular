import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-display',
  standalone: true,
  imports: [CommonModule], // Required for *ngIf, *ngFor etc.
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.scss'],
})
export class ErrorDisplayComponent implements OnChanges {
  @Input() errorMessage: string | null = null;
  showError = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['errorMessage']) {
      this.showError = !!this.errorMessage;
      if (this.errorMessage) {
        setTimeout(() => (this.showError = false), 5000);
      }
    }
  }

  dismissError() {
    this.showError = false;
  }
}
