import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReportsComponent } from './reports/reports.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './service/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { AddPmoComponent } from './add-pmo/add-pmo.component';
import { AddPocComponent } from './add-poc/add-poc.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FeedbackSubmissionComponent } from './feedback-submission/feedback-submission.component'
import { UploadExcelComponent } from './upload-excel/upload-excel.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'event',
    component: EventsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'addPmo',
    component: AddPmoComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'addPocEmail',
    component: AddPocComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'feedbackForm',
    component: FeedbackSubmissionComponent
  },
  {
    path: 'uploadExcel',
    component: UploadExcelComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
