import { Component, OnInit } from '@angular/core';
import { AddPocService } from '../service/add-poc.service';

@Component({
  selector: 'app-add-poc',
  templateUrl: './add-poc.component.html',
  styleUrls: ['./add-poc.component.css']
})
export class AddPocComponent implements OnInit {


  public page: number = 0;
  public users: Array<any>;
  public pages: Array<number>;

  constructor(private pocService: AddPocService) { }

  ngOnInit(): void {
    setTimeout(function () {
      (<any>$('.collapse')).collapse();
    }, 100);
    this.getUsers();
  }

  getUsers() {
    this.pocService.getPocUsers(this.page).subscribe(
      (data: any) => {
        this.users = data['content'];
        this.pages = new Array(data['totalPages']);
      },
      error => {
        console.log(error.error.message);
      }
    )
  }

  setPage(i: number, event: any) {
    event.preventDefault();
    this.page = i;
    this.getUsers();
  }

  addPocEmail(id: number, userEmail: string) {
    if (userEmail == undefined) {
      alert("Enter Email Id");
    } else {
      this.pocService.addPocEmail(id, userEmail).subscribe(
        (data: any) => {
          alert(data.message);
          this.getUsers();
        },
        error => {
          console.log(error.error.message);
        }
      )
    }
  }
}
