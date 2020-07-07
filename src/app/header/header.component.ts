import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  checkLogin(){
    return this.loginService.isUserLoggedIn();
  }

  logout(){
    if(this.loginService.logOut())
        this.router.navigate(['login']);
  }

  getUserDetails(){
    return this.loginService.getUserDetails()
  }
}
