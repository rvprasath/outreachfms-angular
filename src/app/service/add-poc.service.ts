import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { map } from "rxjs/Operators";

@Injectable({
  providedIn: 'root'
})
export class AddPocService {

  constructor(private http: HttpClient) { }

  getPocUsers(page: number) {
    return this.http.get('/outreachfms/getPocs?page=' + page)
  }

  addPocEmail(id: number, userEmail: string) {
    const body = new HttpParams()
      .set('email', userEmail).set('id', JSON.stringify(id));
    return this.http.post('/outreachfms/addPocEmail', body);
  }
}
