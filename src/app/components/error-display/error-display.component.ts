import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.scss'],
})
export class ErrorDisplayComponent implements OnChanges {
  constructor(private router: Router) {}
  @Input() errorMessage: string | null = null;
  showError = null as boolean | null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['errorMessage']) {
      this.showError = !!this.errorMessage;
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
