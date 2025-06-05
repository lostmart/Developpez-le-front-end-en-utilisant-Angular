import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-comp',
  standalone: true,
  imports: [],
  templateUrl: './stat-comp.component.html',
  styleUrl: './stat-comp.component.scss',
})
export class StatCompComponent {
  @Input({ required: true }) statText!: string;
  @Input({ required: true }) statNumber!: number | string;
}
