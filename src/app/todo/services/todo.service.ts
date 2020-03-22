import { AngularFireModule } from '@angular/fire';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';
import { TodoViewModel } from '../models/todo-view-model'

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private db: AngularFirestore) { }

  private toDoCollectionName = "todos";

  getTodos(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Todo>(this.toDoCollectionName, ref => ref.orderBy('createdDate')).get();
  }

  saveTodo(todo: Todo): Promise<DocumentReference> {
    return this.db.collection(this.toDoCollectionName).add(todo)
  }

  editTodo(todo: TodoViewModel): Promise<void> {
    return this.db.collection(this.toDoCollectionName).doc(todo.id).update(todo)
  }

  editTodoUpdate(id: string, obj: Object): Promise<void> {
    return this.db.collection(this.toDoCollectionName).doc(id).update(obj)
  }

  deleteTodo(id: string): Promise<void> {
    return this.db.collection(this.toDoCollectionName).doc(id).delete();
  }
}
