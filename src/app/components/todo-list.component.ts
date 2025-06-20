import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TodoService } from '../services/todo.service';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  standalone: false
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = [];
  editingTodoId: number | null = null;
  selectedCategory: string = 'all';
  isAddModalOpen = false;

  categories = [
    { value: 'all', label: 'All Tasks', color: '#6366f1' },
    { value: 'Trabajo', label: 'Work', color: '#3b82f6' },
    { value: 'Hogar', label: 'Home', color: '#10b981' },
    { value: 'Estudios', label: 'Studies', color: '#f59e0b' }
  ];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todos = this.todoService.getAll();
  }

  openAddTaskModal() {
    this.isAddModalOpen = true;
  }

  closeAddTaskModal() {
    this.isAddModalOpen = false;
  }

  onTaskCreated(todo: Todo) {
    this.todoService.add(todo);
    this.todos = this.todoService.getAll();
    
    // Show success feedback
    Swal.fire({
      icon: 'success',
      title: 'Task Created!',
      text: `"${todo.title}" has been added to your tasks.`,
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    });
  }

  filterByCategory() {
    if (this.selectedCategory === 'all') {
      this.todos = this.todoService.getAll();
    } else {
      this.todos = this.todoService.getByCategory(this.selectedCategory);
    }
  }

  setFilter(category: string) {
    this.selectedCategory = category;
    this.filterByCategory();
  }

  getCategoryLabel(value: string): string {
    const category = this.categories.find(cat => cat.value === value);
    return category ? category.label : value;
  }

  getPriorityLabel(priority: string): string {
    const labels: {[key: string]: string} = {
      'high': 'High',
      'medium': 'Medium', 
      'low': 'Low'
    };
    return labels[priority] || priority;
  }

  trackByTodo(index: number, todo: Todo): number {
    return todo.id;
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
    const todo = this.todos.find(t => t.id === id);
    if (!todo) return;

    Swal.fire({
      title: 'Delete Task?',
      text: `Are you sure you want to delete "${todo.title}"? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.todoService.delete(id);
        this.todos = this.todoService.getAll();
        
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Task has been deleted.',
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          position: 'top-end'
        });
      }
    });
  }

  startEditing(id: number) {
    this.editingTodoId = id;
    // Focus the input after the view updates
    setTimeout(() => {
      const input = document.querySelector('.edit-input') as HTMLInputElement;
      if (input) {
        input.focus();
        input.select();
      }
    }, 0);
  }

  cancelEditing() {
    this.editingTodoId = null;
  }

  finishEditing(id: number, newTitle: string) {
    if (newTitle.trim() !== "") {
      this.todoService.updateTitle(id, newTitle.trim());
      this.editingTodoId = null;
      this.todos = this.todoService.getAll();
      
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Task has been updated.',
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
      });
    }
  }

  onEditKeydown(event: KeyboardEvent, id: number, title: string) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.finishEditing(id, title);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.cancelEditing();
    }
  }

  toggleCompletion(id: number) {
    this.todoService.toggleCompletion(id);
  }
}
