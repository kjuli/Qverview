import { Injectable } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {fromFetch} from "rxjs/fetch";

/**
 * This service provides a way to receive the necessary
 * data.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /**
   * The base url.
   */
  baseUrl: string = "https://raw.githubusercontent.com/kjuli/Qverview/master/data";

  constructor() { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(`An error occurred: ${error.error.message}`);
    } else {
      console.error(`Backend returned code ${error.status}, body was ${error.error}`);
    }

    return throwError(error);
  }

  private extractData(res: Response): Response | any {
    return res || {};
  }

  getData<T>(jsonFileName: string): Observable<T> {
    return fromFetch(this.baseUrl + "/" + jsonFileName, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
      mode: 'no-cors'
    }).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
}
