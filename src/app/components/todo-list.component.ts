import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  
  todos: Todo[] = [];
  newTodoTitle: string = "";

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todos = this.todoService.getAll();
  }

  addTodo() {
    if (this.newTodoTitle.trim() !== "") {
      const newTodo = new Todo(Date.now(), this.newTodoTitle, false);
      this.todoService.add(newTodo);
      this.todos = this.todoService.getAll();  // Refresh list
      this.newTodoTitle = "";  // Reset input
    }
  }

  deleteTodo(id: number) {
    this.todoService.delete(id);
    this.todos = this.todoService.getAll();  // Refresh list
  }

  toggleCompletion(id: number) {
    this.todoService.toggleCompletion(id);
  }
}
