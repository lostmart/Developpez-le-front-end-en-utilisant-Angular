import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { Participation } from '../models/Participation';

/**
 * OlympicService handles the fetching, caching, and distribution
 * of Olympic game data throughout the application.
 *
 * @author Martin P
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
 * Returns all participation entries from all countries.
 *
 * @returns Observable<Participation[]>
 */
getAllParticipations(): Observable<Participation[]> {
  if (this.olympics$.value) {
    const participations = this.olympics$.value.flatMap(o => o.participations);
    return of(participations);
  }

  return this.loadInitialData().pipe(
    map((olympics) =>
      olympics.flatMap((o) => o.participations)
    )
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
  getOlympicById(id: number): Observable<Olympic> {
    // Step 1: Check in-memory cache
    if (this.olympics$.value) {
      const country = this.olympics$.value.find((o) => o.id === id);
      if (country) {
        return of(country);
      } else {
        return throwError(() => new Error(`Country with ID ${id} not found.`));
      }
    }

    // Step 2: Load data from HTTP, then try to find the country
    return this.loadInitialData().pipe(
      map((olympics) => {
        const country = olympics.find((o) => o.id === id);
        if (country) {
          return country;
        } else {
          throw new Error(`Country with ID ${id} not found.`);
        }
      }),
      catchError((error) => {
        // Re-throw any manually thrown or HTTP-related errors
        const message =
          error instanceof Error ? error.message : 'An unknown error occurred.';
        return throwError(() => new Error(message));
      })
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
