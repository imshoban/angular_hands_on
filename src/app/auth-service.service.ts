import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todos } from './interface/todos';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  isLog:boolean = false;
  localUrl:string = 'http://localhost:8080/'
    

  constructor(private http:HttpClient) { }

  isLoggedIn():boolean{
    return localStorage.getItem('username')? true : false;
  }

  loginUser(body:any) : Observable<any>{
    return this.http.post('http://localhost:8080/loginUser', body )
  }

  signupUser(body:any) : Observable<any> {
    return this.http.post('http://localhost:8080/signupUser', body)
  }

  fetchTodo(id:number): Observable<any> {
    return this.sendSecureRequest(this.localUrl + 'fetchTodo', 'get', {id});
  }

  addTodo(todo: Todos): Observable<any> {
    return this.sendSecureRequest(this.localUrl + 'addTodo', 'post', todo);
  }

  markAsComplete(todoId:number): Observable<any> {
    return this.sendSecureRequest(this.localUrl + 'markAsComplete','post', {todoId});
  }

  markAsNotComplete(todoId:number): Observable<any>{
    return this.sendSecureRequest(this.localUrl + 'markAsNotComplete', 'post' , {todoId});
  }

  sendSecureRequest(url : string , methodType : string, params: {}) {
    const token = localStorage.getItem('token')
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : token ? token : ''
    })
    console.log(headers)
    if (methodType == 'get')
    {
      return this.http.get(url,{ headers});
    }
    else{
      return this.http.post(url,params,{ headers });
    }
    
  }

}
