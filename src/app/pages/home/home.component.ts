import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { CommonModule } from '@angular/common';
import { ErrorDisplayComponent } from 'src/app/components/error-display/error-display.component';
import { ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { Router } from '@angular/router';
import { PieGraphComponent } from 'src/app/components/pie-graph/pie-graph.component';
import { TitleComponentComponent } from "../../components/ui/title-component/title-component.component";
import { StatCompComponent } from 'src/app/components/stat-comp/stat-comp.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ErrorDisplayComponent,
    NgChartsModule,
    PieGraphComponent,
    TitleComponentComponent,
    StatCompComponent
    
],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<Olympic[] | null> = of(null);
  public errorMessage: string | null = null;

  private subscriptions = new Subscription();

  // Pie Chart Config
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public olympics: Olympic[] = [];

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.subscriptions.add(this.olympicService.loadInitialData().subscribe());
    this.olympics$ = this.olympicService.getOlympics();

    this.subscriptions.add(
      this.olympicService.getError().subscribe((error) => {
        if (error) this.errorMessage = error;
      })
    );

    this.subscriptions.add(
      this.olympicService.getOlympics().subscribe((data) => {
        if (data) {
          this.olympics = data;
          this.setPieChartData(data);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  setPieChartData(data: Olympic[]) {
    this.pieChartLabels = data.map((c) => c.country);
    this.pieChartData = data.map((c) =>
      c.participations.reduce((sum, p) => sum + p.medalsCount, 0)
    );
  }

  onChartClick(event: any): void {
    const activePoint = event.active[0];
    if (activePoint) {
      const index = activePoint.index;
      const country = this.olympics[index];
      if (country) {
        this.router.navigate(['/country', country.id]);
      }
    }
  }

  getTotalMedals(country: Olympic): number {
    return country.participations.reduce((sum, p) => sum + p.medalsCount, 0);
  }

  getTotalAthletes(country: Olympic): number {
    return country.participations.reduce((sum, p) => sum + p.athleteCount, 0);
  }

  getTotalCountries(): number {
    return this.olympics.length;
  }
}
