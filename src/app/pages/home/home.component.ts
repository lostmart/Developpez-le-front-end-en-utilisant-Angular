import { Component, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { CommonModule } from '@angular/common';
import { ErrorDisplayComponent } from 'src/app/components/error-display/error-display.component';
import { ChartConfiguration, ChartData } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, ErrorDisplayComponent, NgChartsModule],
})
export class HomeComponent implements OnInit {
  barChartData: ChartData<'bar'> = {
  labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
  datasets: [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
  ]
};

barChartOptions: ChartConfiguration<'bar'>['options'] = {
  responsive: true
};

  public olympics$: Observable<Olympic[] | null> = of(null);
  public errorMessage: string | null = null;

  private subscriptions = new Subscription();

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.subscriptions.add(this.olympicService.loadInitialData().subscribe());
    this.olympics$ = this.olympicService.getOlympics();

    this.olympicService.getError().subscribe((error) => {
      if (error) {
        this.errorMessage = error;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getTotalMedals(country: Olympic): number {
    return country.participations.reduce((sum, p) => sum + p.medalsCount, 0);
  }

  getTotalAthletes(country: Olympic): number {
    return country.participations.reduce((sum, p) => sum + p.athleteCount, 0);
  }
}
