import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

/**
 * OlympicService handles the fetching, caching, and distribution
 * of Olympic game data throughout the application.
 *
 * @author
 * @version 1.0
 */
@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';

  /**
   * Holds the latest fetched Olympic data.
   */
  private olympics$ = new BehaviorSubject<Olympic[] | null>(null);

  /**
   * Holds the latest error message (if any).
   */
  private error$ = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  /**
   * Loads data from the JSON file, caches it in memory,
   * and returns it as an Observable.
   *
   * @returns Observable<Olympic[]>
   */
  loadInitialData(): Observable<Olympic[]> {
    if (this.olympics$.value) {
      return of(this.olympics$.value); // Return cached data if available
    }

    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      delay(1200), // Simulate loading delay
      tap((value) => this.olympics$.next(value)),
      catchError((error) => {
        const message = this.getErrorMessage(error);
        console.error('Error loading Olympic data:', error);
        this.olympics$.next(null);
        this.error$.next(message);
        return of([]); // Return empty array to avoid breaking subscribers
      })
    );
  }

  /**
   * Provides the current observable stream of Olympic data.
   */
  getOlympics(): Observable<Olympic[] | null> {
    return this.olympics$.asObservable();
  }

  /**
   * Provides the current error state if any error has occurred.
   */
  getError(): Observable<string | null> {
    return this.error$.asObservable();
  }

  /**
   * Finds and returns a specific Olympic entry by ID.
   *
   * @param id The ID of the country entry
   * @returns Observable<Olympic | null>
   */
  getOlympicById(id: number): Observable<Olympic | null> {
    if (this.olympics$.value) {
      return of(this.olympics$.value.find((o) => o.id === id) ?? null);
    }

    return this.loadInitialData().pipe(
      map((olympics) => olympics.find((o) => o.id === id) ?? null),
      catchError(() => of(null))
    );
  }

  /**
   * Generates a readable error message based on the HTTP error received.
   *
   * @param error The error object returned by the HTTP request
   * @returns string
   */
  private getErrorMessage(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      return `Client Error: ${error.error.message}`;
    }
    return `Server Error: ${error.status} - ${error.message}`;
  }
}
