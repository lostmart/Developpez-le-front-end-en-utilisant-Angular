import { Component, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
// import { DialogService } from 'src/app/core/services/dialog.service';
import { CommonModule } from '@angular/common';
import { ErrorDisplayComponent } from 'src/app/components/error-display/error-display.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, ErrorDisplayComponent],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[] | null> = of(null);
  public errorMessage: string | null = null;

  private subscriptions = new Subscription();

  constructor(
    private olympicService: OlympicService,
    // private dialogService: DialogService
  ) {}

  // openConfirmationDialog(): void {
  //   this.dialogService.triggerOpenDialog();
  // }

  ngOnInit(): void {
    this.subscriptions.add(this.olympicService.loadInitialData().subscribe());

    this.olympics$ = this.olympicService.getOlympics();

    // const errorSub = this.olympicService.getError().subscribe((error) => {
    //   if (error) {
    //     this.errorMessage = error;
    //   }
    // });
    // this.subscriptions.add(errorSub);

    this.olympicService.getError().subscribe((error) => {
      if (error) {
        this.errorMessage = error;
        // this.openConfirmationDialog();
        // optionally: show this in the UI with *ngIf - DONE
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Unsubscribe from all subscriptions
  }

  getTotalMedals(country: Olympic): number {
    return country.participations.reduce((sum, p) => sum + p.medalsCount, 0);
  }

  getTotalAthletes(country: Olympic): number {
    return country.participations.reduce((sum, p) => sum + p.athleteCount, 0);
  }
}
