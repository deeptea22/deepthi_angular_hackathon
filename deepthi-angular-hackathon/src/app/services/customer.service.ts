import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customers } from '../models/customer';
import { Observable, catchError, map, of, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  //base url
  baseurl = 'http://localhost:3000';

  //Declare HTTP Object
  constructor(private http: HttpClient) { }

  // Declare http headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  // Implementing addCustomer method for adding a new customer
  addCustomer(customer: any): Observable<any> {
    return this.http.post<Customers>(
      this.baseurl + '/customers',
      JSON.stringify(customer),
      this.httpOptions
    )
      .pipe(retry(1), catchError(this.handleError));
  }
  logIn(){
    return this.http.get(this.baseurl + '/customers').pipe(map(() => true),
      catchError(() => of(false))
    )
  }

  //handling errors
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
