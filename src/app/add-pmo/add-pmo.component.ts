import { Component, OnInit } from '@angular/core';
import { AddPmoService } from '../service/add-pmo.service'
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-add-pmo',
  templateUrl: './add-pmo.component.html',
  styleUrls: ['./add-pmo.component.css']
})
export class AddPmoComponent implements OnInit {

  email: string;
  public page: number = 0;
  public users: Array<any>;
  public pages: Array<number>;

  constructor(private pmoService: AddPmoService) { }

  ngOnInit(): void {
    setTimeout(function () {
      (<any>$('.collapse')).collapse();
    }, 100);
    this.getUsers();
  }

  setPage(i: number,event:any){
    event.preventDefault();
    this.page=i;
    this.getUsers();
  }

  addPmo(){
    if(this.email == undefined){
      alert("Enter Email to add PMO");
    }else{
    this.pmoService.addPmo(this.email).subscribe(
      (data:any)=>{
        if(data.status == 'SUCCESS'){
          this.email = '';
        }
        alert(data.message);
        this.getUsers();
      },
      error=>{
        console.log(error.error.message);
      }
    )
  }
}

  removePmo(){
    if(this.email == undefined){
      alert("Enter Email to remove PMO");
    }else{
    this.pmoService.removePmo(this.email).subscribe(
      (data:any)=>{
        if(data.status == 'SUCCESS'){
          this.email = '';
        }
        alert(data.message);
        this.getUsers();
      },
      error=>{
        console.log(error.error.message);
      }
    )
  }
  }

  getUsers(){
    this.pmoService.getUsers(this.page).subscribe(
      (data:any)=>{
        this.users = data['content'];
        this.pages = new Array(data['totalPages']);
      },
      error=>{
        console.log(error.error.message);
      }
    )
  }

 
  fileName: string = 'PMO_Report';
  downloadFileExcel() {
    this.pmoService.downloadFileExcel(this.fileName)
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
