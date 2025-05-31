import { Component } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialogue',
  standalone: false,
  templateUrl: './confirmation-dialogue.component.html',
  styleUrl: './confirmation-dialogue.component.scss',
})
export class ConfirmationDialogueComponent {
  onConfirm(): void {
    console.log('Confirmed');
  }

  onCancel(): void {
    console.log('Cancelled');
  }
}
