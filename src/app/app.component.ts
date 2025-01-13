import { Component, ViewChild } from '@angular/core';
import { LocalstorageService } from './service/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LocalstorageService]
})
export class AppComponent {
  title = 'todo-app';
  // @ViewChild isheader: boolean;
  constructor(private localstorage:LocalstorageService){}
}
