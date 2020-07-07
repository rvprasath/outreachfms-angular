import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/Operators";
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  invalidLogin = false
  posts: any;
  authToken: any;
  loginError: any;
  clicked: boolean;

  constructor(private router: Router,
    private loginservice: AuthenticationService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    let user = JSON.parse(sessionStorage.getItem('username'));
    if (!(user === null)) {
      this.router.navigate(['dashboard']);
    }
  }

  // fetch(){
  //   this.loginservice.getData().subscribe(
  //       (data:any) => {
  //         console.log(data);
  //         this.posts = data;
  //       },error=>{
  //         console.log(error);
  //       }
  //       );
  // }

  authenticLogin() {
    if (this.username == '' || this.password == '') {
      alert("Enter Username and Password")
    } else {
      this.clicked = false;
      this.loginservice.authenticate(this.username, this.password).subscribe(
        (data: any) => {
          this.authToken = data.token
          if (this.authToken != null) {
            this.router.navigate(['dashboard'])
            this.invalidLogin = false
          } else {
            this.invalidLogin = true
          }
        }, error => {
          this.loginError = error.error.status;
          if (this.loginError == 401)
            alert('UserName or Password Mismatch');
        }
      );
    }
  }


  fileSystemName: string;
  downloadFileSystem() {
    this.loginservice.downloadFileSystem(this.fileSystemName)
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
