import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { Olympic } from 'src/app/core/models/Olympic';
import { TitleComponentComponent } from '../ui/title-component/title-component.component';

@Component({
  selector: 'app-country-line-graph',
  standalone: true,
  imports: [CommonModule, NgChartsModule, TitleComponentComponent],
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss'],
})
export class CountryLineGraphComponent implements OnChanges {
  @Input() country!: Olympic;

  public entries = 0;
  public totalMedals = 0;
  public totalAthletes = 0;

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

  ngOnChanges(changes: SimpleChanges): void {
    if (this.country) {
      this.buildChartData();
    }
  }

  private buildChartData(): void {
    const labels = this.country.participations.map((p) => p.year.toString());
    const data = this.country.participations.map((p) => p.medalsCount);

    this.entries = this.country.participations.length;
    this.totalMedals = data.reduce((a, b) => a + b, 0);
    this.totalAthletes = this.country.participations.reduce(
      (sum, p) => sum + p.athleteCount,
      0
    );

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
