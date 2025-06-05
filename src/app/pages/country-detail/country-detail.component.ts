import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { TitleComponentComponent } from '../../components/ui/title-component/title-component.component';
import { CountryLineGraphComponent } from 'src/app/components/line-graph/line-graph.component';
import { Router } from '@angular/router';
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
export class CountryDetailComponent implements OnInit {
  country$ = of<Olympic | null>(null);
  public errorMessage: string | null = null;

  public id: number = 0;

  public participations: Participation[] = [];
  public totalMedals: number = 0;
  public totalAthletes: number = 0;

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

        // Load country details
        return this.olympicService.getOlympicById(id);
      }),
      catchError((error) => {
        this.errorMessage = error.message || 'An unexpected error occurred.';
        return of(null);
      })
    );

    // Load participations
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = Number(params.get('id'));
          return this.olympicService.getParticipationsByCountryId(id);
        }),
        catchError((error) => {
          console.error('Failed to load participations', error);
          this.errorMessage = 'Failed to load participations';
          return of([]); // Safe fallback
        })
      )
      .subscribe((data) => {
        this.participations = data;
      });

    // Load total medals
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = Number(params.get('id'));
          return this.olympicService.getTotalMedalsByCountryId(id);
        }),
        catchError((error) => {
          console.error('Failed to load medal count', error);
          return of(0); // Fallback
        })
      )
      .subscribe((count) => {
        this.totalMedals = count;
      });

    // Load total athletes
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = Number(params.get('id'));
          return this.olympicService.getTotalAthletesByCountryId(id);
        }),
        catchError((error) => {
          console.error('Failed to load athlete count', error);
          return of(0); // Fallback
        })
      )
      .subscribe((count) => {
        this.totalAthletes = count;
      });
  }
}
