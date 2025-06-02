import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartType, ChartData, ChartConfiguration } from 'chart.js';
import { Olympic } from 'src/app/core/models/Olympic';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pie-graph',
  standalone: true,
  imports: [NgChartsModule, CommonModule],
  templateUrl: './pie-graph.component.html',
  styleUrls: ['./pie-graph.component.scss'],
})
export class PieGraphComponent implements OnChanges {
  @Input() public data!: Olympic[];

  public pieChartLabels: string[] = [];
  public pieChartType: 'pie' = 'pie';

  public pieChartData: ChartData<'pie', number[], string> = {
    labels: [],
    datasets: [{ data: [] }],
  };

  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.parsed} medals`,
        },
      },
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data && this.data.length > 0) {
      this.buildChartData();
    }
  }

  private buildChartData(): void {
    const labels = this.data.map((c) => c.country);
    const values = this.data.map((c) =>
      c.participations.reduce((sum, p) => sum + p.medalsCount, 0)
    );

    this.pieChartData = {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: [
            '#007bff',
            '#ffc107',
            '#28a745',
            '#dc3545',
            '#6f42c1',
          ],
        },
      ],
    };
  }
}
