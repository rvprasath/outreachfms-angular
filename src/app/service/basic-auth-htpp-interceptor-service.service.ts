import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHtppInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
      req  = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('token'),
          Session: sessionStorage.getItem('username')
        },
        // headers: req.headers.set("session", sessionStorage.getItem('username')),
        // withCredentials: true,
      })
    }

    return next.handle(req);

  }
}
