import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  constructor(private http: HttpClient) { }

  getEventReports(page: number) {
    return this.http.get('/outreachfms/getEventReports?page=' + page)
  }

  downloadFileExcel(filename: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/ms-excel; charset=utf-8');
 
    return this.http.get('/outreachfms/downloadReportExcel?filename=' + filename, {
      headers: headers,
      observe: 'response',
      responseType: 'blob'
    });
  }

  sendReportExcelInEmail(email: string){
    return this.http.get('/outreachfms/sendReportExcelInEmail?email=' + email);
  }
}
