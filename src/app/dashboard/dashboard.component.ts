import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboardCounts: any;
  error: string;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getDashboardDetailsOnLoad();
  }

  getDashboardDetailsOnLoad(){
    this.authService.getDashboardDetails().subscribe(
      (data:any) => {
        this.dashboardCounts = data;     
      },error=>{
        this.error = error.error.error;
      }
      );
  }
}
