import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';


export class Response {
  constructor(
    public statusCode: number, 
    public status: string,
    public error: string
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandleService {

  constructor(private response: Response) { }

  errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      this.response.statusCode = 511;
      this.response.status = 'Network Error';
      this.response.error = error.error.message;
      return this.response;
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
