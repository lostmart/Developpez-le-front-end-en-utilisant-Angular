import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { Olympic } from 'src/app/core/models/Olympic';

import { Participation } from 'src/app/core/models/Participation';

@Component({
  selector: 'app-country-line-graph',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss'],
})
export class CountryLineGraphComponent implements OnChanges {
  @Input() country!: Olympic;

  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [],
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.country) {
      this.buildChartData();
    }
  }

  private buildChartData(): void {
    const participations: Participation[] = this.country.participations;

    const labels: string[] = participations.map((p) => p.year.toString());
    const data: number[] = participations.map((p) => p.medalsCount);

    this.lineChartData = {
      labels,
      datasets: [
        {
          data,
          label: 'Medals per Year',
          fill: false,
          tension: 0.3,
          borderColor: '#007bff',
          backgroundColor: '#007bff',
        },
      ],
    };
  }
}
