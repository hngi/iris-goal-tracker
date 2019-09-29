import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UtilService } from './util.service';
/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class ApiService {
  url: string;

  constructor(public http: HttpClient, private utils: UtilService) {
    this.url = 'https://iris-goal-tracker-api.herokuapp.com/api';
    // this.url = 'http://localhost:3000/api';
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (params.hasOwnProperty(k)) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      // options.search = !options.search && p || options.search
    }

    return this.http.get(`${this.url}/${endpoint}`, reqOpts)
      .pipe(catchError(err => this._handleError(err)));
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    const endpointURL = `${this.url}/${endpoint}`;
    return this.http.post(endpointURL, body, reqOpts)
      .pipe(catchError(err => this._handleError(err)));
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    const endpointURL = `${this.url}/${endpoint}`;
    return this.http.put(endpointURL, body, reqOpts)
      .pipe(catchError(err => this._handleError(err)));
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(`${this.url}/${endpoint}`, reqOpts)
      .pipe(catchError(err => this._handleError(err)));
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(`${this.url}/${endpoint}`, body, reqOpts)
      .pipe(catchError(err => this._handleError(err)));
  }

  private _handleError(error: any) {
    let errorMessagge = '';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      if (error.error.code === 'EXPIRED_TOKEN') {
        return this.utils.showAlert({ title: 'Expired Session', message: error.error.message });
      }

      console.error(
        `Backend returned code ${error.status}, ` +
        `body was:`, error.error.message, 'API code: ', error.error.code);
      errorMessagge = error.error.message;

    }
    // return an ErrorObservable with a user-facing error message
    return throwError(
      errorMessagge || 'An error occurred. Please try again or check your internet connection.');
  }
}
