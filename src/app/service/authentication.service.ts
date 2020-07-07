import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map } from "rxjs/Operators";
import { Observable } from 'rxjs';
import { FileHandle } from '../drag-and-drop.directive';


export class JwtResponse {
  constructor(
    public token: string,
  ) { }

}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  readonly ROOT_URL = 'http://localhost:8080/outreachfms';

  authenticate(username: string, password: string) {
    return this.httpClient.post('/outreachfms/authenticate', { username, password }, httpOptions)
      .pipe(
        map(
          (userData: any) => {
            sessionStorage.setItem('username', JSON.stringify(userData.userDto));
            let tokenStr = 'Bearer ' + userData.token;
            sessionStorage.setItem('token', tokenStr);
            return userData;
          }
        )
      );
  }



  isUserLoggedIn() {
    let user = JSON.parse(sessionStorage.getItem('username'))
    // console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('token')
    return true;
  }

  getUserDetails() {
    return JSON.parse(sessionStorage.getItem('username'));
  }


  getDashboardDetails() {
    return this.httpClient.get("/outreachfms/dashboardDetails", httpOptions).pipe(
      map((data: any) => { return data }))
  }

  downloadFileSystem(filename: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/ms-excel; charset=utf-8');

    return this.httpClient.get('/outreachfms/excel?filename=' + filename, {
      headers: headers,
      observe: 'response',
      responseType: 'blob'
    });
  }

  getFeedbackForm(eventId, employeeId, secretCode) {
    return this.httpClient.get("/outreachfms/getFeedbackForm?eventId=" + eventId + "&employeeId=" + employeeId + "&secretCode=" + secretCode);
  }

  saveFeedbackAnswer(data: any){
    return this.httpClient.post('/outreachfms/submitFeedback', data, httpOptions);
  }

  // uploadExcelFile(files: FileHandle[]){
  //   // const body = new HttpParams()
  //   //   .set('email', email);
  //   return this.httpClient.post('/outreachfms/submitFeedback', files, httpOptions);
  // }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', '/outreachfms/uploadExcelFile', formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req);
  }

}
