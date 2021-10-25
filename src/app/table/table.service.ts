import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { HttpErrorResponse } from '@angular/common/http';

const REQUEST_URL: string = 'https://reqres.in/api/users';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient) { }

  getTableData(): Observable<any> {
    return this.http.get(REQUEST_URL).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    )
  }

  handleError(error: HttpErrorResponse): any {
    if (error.status === 0 ) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError('Try again later');
  }

}
