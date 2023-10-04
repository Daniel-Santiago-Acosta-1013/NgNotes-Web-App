import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TodoService } from '../services/todo.service';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = [];
  newTodoTitle: string = "";
  editingTodoId: number | null = null;
  newTodoPriority: 'high' | 'medium' | 'low' = 'medium';
  newTodoDueDate: string = '';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todos = this.todoService.getAll();
  }

  addTodo() {
    if (!this.newTodoDueDate) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please select a due date for the task.'
      });
      return;
    }

    if (this.newTodoTitle.trim() !== "") {
      const newTodo = new Todo(
        Date.now(),
        this.newTodoTitle,
        false,
        this.newTodoPriority,
        new Date(this.newTodoDueDate)
      );
      this.todoService.add(newTodo);
      this.todos = this.todoService.getAll();
      this.newTodoTitle = "";
      this.newTodoPriority = 'medium';
      this.newTodoDueDate = '';
    }
  }

  formatDueDate(date: Date): string {
    return formatDate(date, 'MMM d, y, h:mm a', 'en-US');
  }

  isDueSoon(todo: Todo): boolean {
    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const dueDate = new Date(todo.dueDate);
    return (dueDate.getTime() - now.getTime()) <= oneDay && (dueDate.getTime() - now.getTime()) > 0;
  }

  isOverdue(todo: Todo): boolean {
    const now = new Date();
    return now > todo.dueDate;
  }

  deleteTodo(id: number) {
    this.todoService.delete(id);
    this.todos = this.todoService.getAll();  // Refresh list
  }

  startEditing(id: number) {
    this.editingTodoId = id;
  }

  cancelEditing() {
    this.editingTodoId = null;
  }

  finishEditing(id: number, newTitle: string) {
    if (newTitle.trim() !== "") {
      this.todoService.updateTitle(id, newTitle);
      this.editingTodoId = null;  // Terminar edición
      this.todos = this.todoService.getAll();  // Refrescar lista
    }
  }

  toggleCompletion(id: number) {
    this.todoService.toggleCompletion(id);
  }
}
