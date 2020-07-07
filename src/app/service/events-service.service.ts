import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsServiceService {

  constructor(private http: HttpClient) { }

  getEvents(page: number){
      return this.http.get('/outreachfms/getEvent?page='+page)
  }

  getEventDetails(eventId: any){
    return this.http.get('/outreachfms/getEventDetails?eventId='+eventId)
  }

  getEventFeedbackDetails(eventId: any){
    return this.http.get('/outreachfms/getEventFeedbackDetails?eventId='+eventId)
  }
  
  sendEmailForFeedback(eventId: any){
    return this.http.get('/outreachfms/sendEmailForFeedback?eventId='+eventId);
  }

  downloadFileExcel(filename: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/ms-excel; charset=utf-8');
 
    return this.http.get('/outreachfms/downloadEventExcel?filename=' + filename, {
      headers: headers,
      observe: 'response',
      responseType: 'blob'
    });
  }
}
