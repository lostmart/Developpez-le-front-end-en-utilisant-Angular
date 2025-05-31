import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
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
      delay(1200),
      tap((value) => this.olympics$.next(value)),
      catchError((error) => {
        const message = this.getErrorMessage(error); // Now gets a string
        console.error('Error loading Olympic data:', error);
        this.olympics$.next(null);
        this.error$.next(message); // Works because message is string
        return of([]);
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
  private getErrorMessage(error: HttpErrorResponse): string {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return errorMessage; // Return string directly
  }
}
