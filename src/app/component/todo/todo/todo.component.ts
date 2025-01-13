import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Todos } from 'src/app/interface/todos';
import { LocalstorageService } from 'src/app/service/localstorage.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: []
})
export class TodoComponent implements OnInit {
  todoList!: Todos[];
  id!:number;
  todoValue!: string;
  todo !: Todos;
  isLoading: boolean = false;

  constructor(private http:HttpClient, private localStorage:LocalstorageService, private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.fetchTodo()

  }

  addTodo(){
    this.isLoading = true;
    if (this.todoValue == null || this.todoValue == '') return;
    this.todo = {
        id:this.id+=1,
        title:this.todoValue,
        is_completed:false
      }
    
    // this.http.post('http://localhost:8080/addtodo',this.todo,)
    this.authService.addTodo(this.todo)
    .subscribe((res:any)=>{
      // this.isLoading = false;
      this.fetchTodo();
      this.todoValue = '';
    });
  }

  markAsComplete(todoId:number){
    this.authService.markAsComplete(todoId)
    .subscribe((res:any)=>{
      this.fetchTodo();  
    })
  }

  markAsNotComplete(todoId:number){
    this.authService.markAsNotComplete(todoId)
    .subscribe((res:any)=>{
      this.fetchTodo();  
    })
  }

  fetchTodo(){
    this.isLoading=true;
    this.authService.fetchTodo(this.id)
    .subscribe(responseData => {
      console.log('responseData', responseData);
      this.isLoading=false;
      const responseList =[]
      for(const data in responseData){
        console.log(data);
        responseList.push({...responseData[data]});
      }
      this.todoList = responseList
      this.id = responseList[responseList.length - 1].id  

    })
  }

  deleteTodo(id : number){
    this.todoList = this.todoList.filter(x => {return x.id !== id});
  }
}
