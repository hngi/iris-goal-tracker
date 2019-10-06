import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TeamComponent } from './team/team.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { AuthGuard } from './auth/auth.guard';
import { ResetTokenGuard } from './auth/reset-token.guard';


const routes: Routes = [
  { path: '', redirectTo: '/home/', pathMatch: 'full' },
  { path: 'home/:token', component: HomeComponent },
  { path: 'team', component: TeamComponent },
  { path: 'reset-password/:token', canActivate: [ResetTokenGuard], component: ResetPasswordComponent },
  { path: 'about', component: AboutComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
