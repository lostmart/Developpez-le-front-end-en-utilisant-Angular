import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './title-component.component.html',
  styleUrl: './title-component.component.scss',
})
export class TitleComponentComponent {
  @Input({ required: true }) title!: string;
  @Input() headingLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h2';
}
