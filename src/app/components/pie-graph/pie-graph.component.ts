import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData, ChartConfiguration } from 'chart.js';
import { Olympic } from 'src/app/core/models/Olympic';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChartEvent } from 'chart.js/dist/core/core.plugins';

@Component({
  selector: 'app-pie-graph',
  standalone: true,
  imports: [NgChartsModule, CommonModule],
  templateUrl: './pie-graph.component.html',
  styleUrls: ['./pie-graph.component.scss'],
})
export class PieGraphComponent implements OnChanges {
  constructor(private router: Router) {}

  @Input() public data!: Olympic[];

  public pieChartLabels: string[] = [];
  public pieChartType: 'pie' = 'pie';
  public olympics: Olympic[] = this.data;

  public pieChartData: ChartData<'pie', number[], string> = {
    labels: [],
    datasets: [{ data: [] }],
  };

  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `🏅 ${context.parsed}`,
        },
      },
    },
  };

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.data && this.data.length > 0) {
      this.buildChartData();
    }
  }

  onChartClick(event: { event?: ChartEvent; active?: any[] }): void {
    const activePoint = event.active?.[0];
    if (activePoint) {
      const index = activePoint.index;
      const country = this.data[index];
      if (country) {
        this.router.navigate(['/country', country.id]);
      }
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
            '#bfe0f1',
            '#956065',
            '#89a1db',
            '#793d52',
            '#9780a1',
          ],
        },
      ],
    };
  }
}
