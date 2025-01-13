import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { LocalstorageService } from 'src/app/service/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})
export class LoginComponent implements OnInit {
  submitted = false;
  authError = false;
  loginForm:any = FormGroup;
  success : boolean | null = false;


  constructor(private router:Router, private localstorage:LocalstorageService, private authService:AuthServiceService,
    private route:ActivatedRoute) {

   }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    })
    const queryParams = Boolean(this.route.snapshot.queryParamMap.get('success'))
    this.success = queryParams ? queryParams: null;
    
  }

  login(){
    this.submitted = true
    console.log(this.loginForm.status);
    if(this.loginForm.status == "INVALID"){
      return
    }
    this.authService.loginUser({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password})
      .subscribe((res:any)=>{
        console.log(res);
        if(res.success){
          this.router.navigate(['home']);
          this.localstorage.setLoginSession(res.username,res?.token);
          this.authService.isLog = true;
        }
        else{
          this.authError = true;
          // this.router.navigate(['']);
        }
      })
  }

  

}
