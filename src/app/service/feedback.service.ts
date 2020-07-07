import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  saveUNNAQuestions(inputs: any[], UNNAQuestion: any, participationType: string): any {
    const body = new HttpParams().
      set('question', UNNAQuestion).set('participationType', participationType)
      .set('answers', inputs.join(', '));
    return this.http.post('/outreachfms/addUnregisterNotAttendedQuestion', body);

  }

  constructor(private http: HttpClient) { }

  addRatingQuestion(ratingQues: string, likeQues: string, dislikeQues: string) {
    const body = new HttpParams()
      .set('ratingQues', ratingQues)
      .set('likeQues', likeQues)
      .set('dislikeQues', dislikeQues);
    return this.http.post('/outreachfms/addRatingQuestion', body);
  }

  getFeedbackQuestions(page: number){
    return this.http.get('/outreachfms/getFeedbackQuestions?page='+page)
  }
}
