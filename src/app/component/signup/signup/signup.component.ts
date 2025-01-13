import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm:any = FormGroup;
  registered:boolean = false;
  constructor(private authService:AuthServiceService, private router:Router) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  signup(){
    if(this.signupForm.status == 'INVALID'){return}
    this.authService.signupUser({
      username: this.signupForm.value.username,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    })
    .subscribe((res:any) => {
      console.log(res);
      if(res?.error){ 
        this.registered = true;
      }
      else{
        this.router.navigate(['login'],{queryParams: {'success' : true}});

      }
    })
  }

}
