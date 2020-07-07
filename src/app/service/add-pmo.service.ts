import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AddPmoService {


  constructor(private http: HttpClient) { }

  addPmo(email: any) {
    const body = new HttpParams()
      .set('email', email);
    return this.http.post('/outreachfms/addPmo', body);
  }

  removePmo(email: any) {
    const body = new HttpParams()
      .set('email', email);
    return this.http.post('/outreachfms/removePmo', body);
  }

  getUsers(page: number) {
    return this.http.get('/outreachfms/getUsers?page=' + page)
  }

  downloadFileExcel(filename: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/ms-excel; charset=utf-8');
 
    return this.http.get('/outreachfms/getPmoExcel?filename=' + filename, {
      headers: headers,
      observe: 'response',
      responseType: 'blob'
    });
  }
}
