import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialogue',
  standalone: false,
  templateUrl: './confirmation-dialogue.component.html',
  styleUrl: './confirmation-dialogue.component.scss',
})
export class ConfirmationDialogueComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) showDialog!: boolean;
  @Input({ required: true }) isClosing!: boolean;

  @Output() closed = new EventEmitter<boolean>();
  @Output() setIsClosing = new EventEmitter<boolean>();

  onConfirm(): void {
    this.setIsClosing.emit(true);
    setTimeout(() => {
      this.closed.emit(false);
      this.setIsClosing.emit(false);
    }, 290);
  }

  onCancel(_e: MouseEvent): void {
    this.setIsClosing.emit(true);
    setTimeout(() => {
      this.closed.emit(false);
      this.setIsClosing.emit(false);
    }, 290);
  }
}
