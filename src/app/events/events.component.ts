import { Component, OnInit } from '@angular/core';
import { EventsServiceService } from '../service/events-service.service'
import { AuthenticationService } from '../service/authentication.service'
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  public page: number = 0;
  public events: Array<any>;
  public pages: Array<number>;
  public eventDetailsObj: any;
  public eventIdEmail: string = '';
  public eventDetailsFeedback: any;

  eventDiv: boolean = true;
  eventDetailsDiv: boolean = false;

  constructor(private eventService: EventsServiceService, private loginService: AuthenticationService) { }

  ngOnInit(): void {
    setTimeout(function(){
      (<any>$('.collapse')).collapse();
    }, 100);
    this.getEvents();
  }
  
  setPage(i: number,event:any){
    event.preventDefault();
    this.page=i;
    this.getEvents();
  }

  sendEmailForFeedback(){
    // alert(this.eventIdEmail);
    this.eventService.sendEmailForFeedback(this.eventIdEmail).subscribe(
      (data:any) => {
        alert(data.message);
      },
      error => {
        console.log(error.error.message);
      }
    )
  }
  
  showHideDiv(div: String){
    if(div =='event'){
      this.eventDiv = false;
      this.eventDetailsDiv = true;
    }else{
      this.eventIdEmail = '';
      this.eventDiv = true;
      this.eventDetailsDiv = false;
    }
    setTimeout(function(){
      (<any>$('.collapse')).collapse();
    }, 100);
  }

  viewEventDetails(eventId: any){
    this.eventIdEmail = eventId;
    this.eventService.getEventDetails(eventId).subscribe(
      (data:any)=>{
        console.log(data)
        this.eventDetailsObj = data;
      },
      error=>{
        console.log(error.error.message)
      }
    )

    this.eventService.getEventFeedbackDetails(eventId).subscribe(
      (data:any)=>{
        console.log(data)
        this.eventDetailsFeedback = data;
      },
      error=>{
        console.log(error.error.message)
      }
    )
  }

  getEvents() {
    this.eventService.getEvents(this.page).subscribe(
      data => {
        console.log(data);
        this.events = data['content'];
        this.pages = new Array(data['totalPages']);
      },
      error => { 
        console.log(error.error.message); 
      }
    )
  }

  getUserDetails(){
    return this.loginService.getUserDetails()
  }

  excelFileName: string = 'Event_Details';
  downloadFileExcel() {
    this.eventService.downloadFileExcel(this.excelFileName)
      .subscribe(response => {
        const filename = response.headers.get('filename');

        this.saveFile(response.body, filename);
      });
  }

  saveFile(data: any, filename?: string) {
    const blob = new Blob([data], { type: 'application/ms-excel; charset=utf-8' });
    fileSaver.saveAs(blob, filename);
  }
}
