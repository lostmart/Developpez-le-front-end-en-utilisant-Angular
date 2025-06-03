import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[] | null>(null);
  private error$ = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  loadInitialData(): Observable<Olympic[]> {
    if (this.olympics$.value) {
      return of(this.olympics$.value);
    }

    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      delay(1200),
      tap((value) => {
        this.olympics$.next(value);
      }),
      catchError((error) => {
        const message = this.getErrorMessage(error);
        console.error('Error loading Olympic data:', error);
        this.olympics$.next(null);
        this.error$.next(message);
        return of([]);
      })
    );
  }

  getError(): Observable<string | null> {
    return this.error$.asObservable();
  }

  getOlympics(): Observable<Olympic[] | null> {
    return this.olympics$.asObservable();
  }

  getOlympicById(id: number): Observable<Olympic | null> {
    if (this.olympics$.value) {
      // If already loaded, return directly
      return of(this.olympics$.value.find((o) => o.id === id) ?? null);
    } else {
      // Otherwise, fetch data and extract the one with matching ID
      return this.loadInitialData().pipe(
        map((olympics) => olympics.find((o) => o.id === id) ?? null),
        catchError(() => of(null))
      );
    }
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      return `Error: ${error.error.message}`;
    } else {
      return `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
  }
}
