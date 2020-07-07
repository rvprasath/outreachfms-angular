import { Component, OnInit } from '@angular/core';
import { ReportServiceService } from '../service/report-service.service'
import { AuthenticationService } from '../service/authentication.service'
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  public page: number = 0;
  public events: Array<any>;
  public pages: Array<number>;
  public emailReport: string;

  constructor(private reportService: ReportServiceService, private loginService: AuthenticationService) { }

  ngOnInit(): void {
    setTimeout(function () {
      (<any>$('.collapse')).collapse();
    }, 100);
    this.getEventReports();
  }

  getUserDetails() {
    return this.loginService.getUserDetails()
  }

  setPage(i: number,event:any){
    event.preventDefault();
    this.page=i;
    this.getEventReports();
  }

  getEventReports() {
    this.reportService.getEventReports(this.page).subscribe(
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

  excelFileName: string = 'Report_details';
  downloadFileExcel() {
    this.reportService.downloadFileExcel(this.excelFileName)
      .subscribe(response => {
        const filename = response.headers.get('filename');

        this.saveFile(response.body, filename);
      });
  }

  saveFile(data: any, filename?: string) {
    const blob = new Blob([data], { type: 'application/ms-excel; charset=utf-8' });
    fileSaver.saveAs(blob, filename);
  }

  sendReportExcelInEmail(){
    this.reportService.sendReportExcelInEmail(this.emailReport).subscribe(
      (data:any) => {
        alert(data.message);
      },
      error => {
        console.log(error.error.message);
      }
    )
  }
}
