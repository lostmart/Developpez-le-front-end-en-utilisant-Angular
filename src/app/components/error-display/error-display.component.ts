import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-display',
  standalone: true,
  imports: [CommonModule], // Required for *ngIf, *ngFor etc.
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.scss'],
})
export class ErrorDisplayComponent implements OnChanges {
  constructor(private router: Router) {}
  @Input() errorMessage: string | null = null;
  showError = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['errorMessage']) {
      this.showError = !!this.errorMessage;
    }
  }

  dismissError() {
    this.showError = false;
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
