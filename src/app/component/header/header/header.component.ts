import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { LocalstorageService } from 'src/app/service/localstorage.service'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string | null= '';
  constructor(private route:Router, private authService:AuthServiceService) { }

  ngOnInit(): void {
    this.username=localStorage.getItem('username');
  }

  logout(){
    localStorage.removeItem('username');
    this.route.navigate(['login']);
  }

}
