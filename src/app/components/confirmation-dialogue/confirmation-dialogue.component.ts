import { Component } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialogue',
  standalone: false,
  templateUrl: './confirmation-dialogue.component.html',
  styleUrl: './confirmation-dialogue.component.scss',
})
export class ConfirmationDialogueComponent {
  showDialog: boolean = true;
  isClosing = false;

  openDialog(): void {
    this.showDialog = true;
  }

  onConfirm(): void {
    this.isClosing = true;
    setTimeout(() => {
      this.showDialog = false;
    }, 300);
  }

  onCancel(e: MouseEvent): void {
    this.isClosing = true;
    setTimeout(() => {
      this.showDialog = false;
    }, 300);
  }
}
