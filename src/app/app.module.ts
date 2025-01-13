import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login/login.component';
import { TodoComponent } from './component/todo/todo/todo.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './component/header/header/header.component';
import { SignupComponent } from './component/signup/signup/signup.component'
import { AuthGuardService } from './auth-guard.service';

const route:Route[] =[
  {path:'',component:LoginComponent},
  {path:'home', canActivate:[AuthGuardService], component:TodoComponent},
  {path:'signup', component: SignupComponent},
  {path:'**', component:LoginComponent}
] 


@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent,
    TodoComponent,
    HeaderComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(route)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
