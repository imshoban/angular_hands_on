import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  constructor() { }

  setLoginSession(username:string, token:string){
    localStorage.setItem('username',username);
    localStorage.setItem('token',token);
  }

}
