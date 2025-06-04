import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { TitleComponentComponent } from '../../components/ui/title-component/title-component.component';
import { CountryLineGraphComponent } from 'src/app/components/line-graph/line-graph.component';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [CommonModule, TitleComponentComponent, CountryLineGraphComponent],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.scss',
})
export class CountryDetailComponent implements OnInit {
  country$ = of<Olympic | null>(null);

  constructor(
    private route: ActivatedRoute,
    private olympicService: OlympicService
  ) {}

  goBack(): void {
    window.history.back();
  }

  ngOnInit(): void {
    this.country$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = Number(params.get('id'));
        return this.olympicService.getOlympicById(id);
      })
    );
  }
}
