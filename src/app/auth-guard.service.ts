import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService:AuthServiceService, private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean>| Promise<boolean>|boolean{
    if(this.authService.isLoggedIn()){
      return true;
    }
    else{
      console.log('checking');
      this.router.navigate(['login']);
      return false;
    }
  }
}
