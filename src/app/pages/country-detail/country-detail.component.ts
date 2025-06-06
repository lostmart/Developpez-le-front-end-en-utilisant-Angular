import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, Subject, switchMap, takeUntil } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { TitleComponentComponent } from '../../components/ui/title-component/title-component.component';
import { CountryLineGraphComponent } from 'src/app/components/line-graph/line-graph.component';
import { ErrorDisplayComponent } from 'src/app/components/error-display/error-display.component';
import { Participation } from 'src/app/core/models/Participation';
import { StatCompComponent } from 'src/app/components/stat-comp/stat-comp.component';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponentComponent,
    CountryLineGraphComponent,
    ErrorDisplayComponent,
    StatCompComponent,
  ],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.scss',
})
export class CountryDetailComponent implements OnInit, OnDestroy {
  country$ = of<Olympic | null>(null);
  public errorMessage: string | null = null;

  public id: number = 0;
  public participations: Participation[] = [];
  public totalMedals: number = 0;
  public totalAthletes: number = 0;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private olympicService: OlympicService,
    private router: Router
  ) {}

  goBack(): void {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.country$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = Number(params.get('id'));
        this.id = id;
        return this.olympicService.getOlympicById(id);
      }),
      catchError((error) => {
        this.errorMessage = error.message || 'An unexpected error occurred.';
        return of(null);
      })
    );

    this.country$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((olympic) => {
      if (olympic) {
        this.participations = olympic.participations || [];
        this.totalMedals = this.participations.reduce((sum, participation) => sum + participation.medalsCount, 0);
        this.totalAthletes = this.participations.reduce((sum, participation) => sum + participation.athleteCount, 0);
      } else {
        this.participations = [];
        this.totalMedals = 0;
        this.totalAthletes = 0;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}