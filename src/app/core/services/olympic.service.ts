import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[] | null>(null);

  constructor(private http: HttpClient) {}

  loadInitialData(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => {
        setTimeout(() => {
          return this.olympics$.next(value);
        }, 1200);
        // throw new Error('You application has ran into an error !!!');
      }),
      catchError((error) => {
        const message = this.getErrorMessage(error);
        console.error('Error loading Olympic data:', error);
        this.olympics$.next(null);
        this.error$.next(message);
        return of([]); // of([]) → returns an empty array, which avoids breaking a .subscribe() expecting a list.
      })
    );
  }

  private error$ = new BehaviorSubject<string | null>(null);
  getError(): Observable<string | null> {
    return this.error$.asObservable();
  }

  getOlympics(): Observable<Olympic[] | null> {
    return this.olympics$.asObservable();
  }

  // error handling
  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    if (typeof error === 'string') return error;
    if (
      error &&
      typeof error === 'object' &&
      'status' in error &&
      'statusText' in error
    ) {
      const status = (error as { status: number }).status;
      const statusText = (error as { statusText: string }).statusText;
      return `HTTP error ${status}: ${statusText}`;
    }
    return 'Unknown error occurred while loading Olympic data.';
  }
}
