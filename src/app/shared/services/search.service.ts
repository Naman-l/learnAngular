// search.service.ts

import { Injectable } from '@angular/core'; 
//a decorator provided by Angular that marks the class located directly below it as a service that can be injected.
import { HttpClient } from '@angular/common/http';
// HttpClient provides the necessary HTTP methods.
import { map } from 'rxjs/operators';
//map is an RxJS operator that is used to modify the response received from the API call.
import { Observable } from 'rxjs';
// import { Console } from 'console';
// we simply import the necessary files that’ll help us build our service.

@Injectable({
  providedIn: 'root'
  //signifies that the service is provided in the root component of the Angular app, which in this case is the app component.
})
export class SearchService {

  private API_URL = "https://api.github.com/users";
  

  constructor(private http: HttpClient) {}


  getRepos(query: string,page:number): Observable <any> {
    const url = `${this.API_URL}/${query}/repos?page=${page}&per_page=10`;
    return this.http.get(url)
      .pipe(
        map((response: any) => response)
      );
  }

  getDetails(query: string,page:number): Observable <any> {
    const url = `${this.API_URL}/${query}?page=${page}&per_page=10`;
    return this.http.get(url)
      .pipe(
        map((response: any) => response)
      );
  }
}
