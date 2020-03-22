import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TodoService } from './../services/todo.service';
import { TodoViewModel } from './../models/todo-view-model'
import { TodoFormComponent } from './../todo-form/todo-form.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(private modalService: NgbModal, private todoService: TodoService) { }

  todos: TodoViewModel[] = []
  priorities: string[] = ["Medium", "High", "Very High"];
  
  private _currentPriority: string = "All";


  set currentPriority(value:string) {
    this._currentPriority = value;
  } 

  get currentPriority() {
    return  this._currentPriority
  }
  ngOnInit(): void {
    this.loadTodos();
    
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(response => {
      this.todos = [];
      response.docs.forEach(value => {
        const data = value.data();
        const id = value.id;
        const todo: TodoViewModel = {
          id: id,
          title: data.title,
          description: data.description,
          done: data.done,
          priority: data.priority,
          deadline: data.deadline && data.deadline.toDate(),
          createdDate: data.createdDate.toDate(),
          isOutdate: data.deadline && (data.deadline.toDate().getTime() - new Date().getTime()) < 0
        }
        this.todos.push(todo);
        this.todos.sort((a,b) => {
          return b.createdDate.getTime() - a.createdDate.getTime()
        })
        console.log(this.todos)
      })
    })
  }

  clickAddTodo() {
    const modal = this.modalService.open(TodoFormComponent);
    modal.result.then(
      this.handleModalFormClose.bind(this),
      this.handleModalFormClose.bind(this)
    )
  }
  

  handleModalFormClose(response) {
    if (typeof response === "object" && response !== null) {
      if (response.createMode) {
        response.todo.id = response.id;
        this.todos.unshift(response.todo)
      } else {
        let index = this.todos.findIndex(value => value.id === response.id);
        this.todos[index] = response.todo
      }
    }
  }

  

  handleDeleteClick(id, idx) {
    this.todoService.deleteTodo(id)
    .then(() => {
      this.todos.splice(idx, 1);
    })
    .catch(e => console.error(e))
  }

  async handleDeleteDoneClick() {
    for await (const todo of this.todos) {
      if (todo.done) {
       this.todoService.deleteTodo(todo.id)
       .then(() => console.log("todo id" + todo.id + " todo idx " + this.todos.indexOf(todo)))
        .then(() => 
        this.todos.splice(this.todos.indexOf(todo), 1))
        
        .catch(e => console.error(e))
      }
    }
  }

  checkedDone(idx: number) {
    this.todos[idx].done = !this.todos[idx].done;
    const obj = {done: this.todos[idx].done};
    const id = this.todos[idx].id;
    this.todoService.editTodoUpdate(id, obj);
  }

  handleEditClick(todo: TodoViewModel) {
    const modal = this.modalService.open(TodoFormComponent);
    modal.result.then(
      this.handleModalFormClose.bind(this),
      this.handleModalFormClose.bind(this)
    )

    modal.componentInstance.createMode = false;
    modal.componentInstance.todo = todo;
  }

}
