import { TodoViewModel } from './../models/todo-view-model';
import { DocumentReference } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TodoService } from './../services/todo.service';
import { Todo } from '../models/todo';







@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup;
  priorities: string[] = ["Medium", "High", "Very High"];
  

  constructor(private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private todoService: TodoService) {  }

  createMode: boolean = true;
  todo: TodoViewModel

  ngOnInit(): void {
    this.todoForm =  this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['Medium', Validators.required],
      endDate : [''],
      done: false,
    });
    if (!this.createMode) this.loadTodo(this.todo)
  }

  loadTodo(todo) {
    this.todoForm.patchValue(todo)
  }
  saveTodo() {
    if (this.todoForm.invalid) {
      return;
    }

    if(this.createMode) {
      let todo: Todo = this.todoForm.value;
      todo.createdDate = new Date ();
      todo.deadline = this.todoForm.value.endDate ? new Date (this.todoForm.value.endDate) : null
      this.todoService.saveTodo(todo)
        .then(response => this.handleSuccesSaveTodo(response, todo))
        .catch(e => console.error(e))
    } else {
      let todo: TodoViewModel = this.todoForm.value;
      todo.id = this.todo.id;
      todo.createdDate = this.todo.createdDate
      todo.deadline = this.todoForm.value.endDate ? new Date (this.todoForm.value.endDate) : null;
      todo.isOutdate = todo.deadline && (todo.deadline.getTime() - new Date().getTime()) < 0
      this.todoService.editTodo(todo)
        .then(() => this.handleSuccesEditTodo(todo))
        .catch(e => console.error(e))
    }

    
    
  }

  handleSuccesSaveTodo(response: DocumentReference, todo: Todo) {
    this.activeModal.dismiss({ todo: todo, id: response.id, createMode: true})
  }

  handleSuccesEditTodo(todo: TodoViewModel) {
    this.activeModal.dismiss({ todo: todo, id: todo.id, createMode: false});
    
  }

}
