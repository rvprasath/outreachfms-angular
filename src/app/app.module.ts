import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReportsComponent } from './reports/reports.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthHtppInterceptorService } from './service/basic-auth-htpp-interceptor-service.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { EventsServiceService } from './service/events-service.service'
import { ReportServiceService } from './service/report-service.service';
import { AddPmoComponent } from './add-pmo/add-pmo.component';
import { AddPocComponent } from './add-poc/add-poc.component'
import { AddPmoService } from './service/add-pmo.service';
import { FeedbackComponent } from './feedback/feedback.component'
import { FeedbackService } from "./service/feedback.service"
import { AuthenticationService } from "./service/authentication.service"
import { AddPocService } from "./service/add-poc.service";
import { AddAnswerComponentComponent } from './add-answer-component/add-answer-component.component';
import { FeedbackSubmissionComponent } from './feedback-submission/feedback-submission.component';
import { UploadExcelComponent } from './upload-excel/upload-excel.component';
import { DragAndDropDirective } from './drag-and-drop.directive'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReportsComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    EventsComponent,
    AddPmoComponent,
    AddPocComponent,
    FeedbackComponent,
    AddAnswerComponentComponent,
    FeedbackSubmissionComponent,
    UploadExcelComponent,
    DragAndDropDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi: true
    },
    EventsServiceService,
    ReportServiceService,
    AddPmoService,
    FeedbackService,
    AuthenticationService,
    AddPocService],
  bootstrap: [AppComponent],
  entryComponents: [

    AddAnswerComponentComponent,

  ],
})
export class AppModule { }
