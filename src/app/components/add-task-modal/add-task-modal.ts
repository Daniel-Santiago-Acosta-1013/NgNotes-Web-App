import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.html',
  styleUrl: './add-task-modal.scss',
  standalone: false
})
export class AddTaskModalComponent {
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() taskCreated = new EventEmitter<Todo>();

  newTodoTitle: string = "";
  newTodoPriority: 'high' | 'medium' | 'low' = 'medium';
  newTodoDueDate: string = '';
  newTodoCategory: string = 'Trabajo';

  categories = [
    { value: 'Trabajo', label: 'Work', color: '#3b82f6', icon: '💼' },
    { value: 'Hogar', label: 'Home', color: '#10b981', icon: '🏠' },
    { value: 'Estudios', label: 'Studies', color: '#f59e0b', icon: '📚' }
  ];

  priorities = [
    { value: 'high', label: 'High Priority', color: '#ef4444', description: 'Urgent and important' },
    { value: 'medium', label: 'Medium Priority', color: '#f59e0b', description: 'Important but not urgent' },
    { value: 'low', label: 'Low Priority', color: '#10b981', description: 'Nice to have' }
  ];

  close() {
    this.resetForm();
    this.closeModal.emit();
  }

  onSubmit() {
    if (!this.newTodoTitle.trim() || !this.newTodoDueDate) {
      return;
    }

    const newTodo = new Todo(
      Date.now(),
      this.newTodoTitle.trim(),
      false,
      this.newTodoPriority,
      new Date(this.newTodoDueDate),
      this.newTodoCategory
    );

    this.taskCreated.emit(newTodo);
    this.close();
  }

  private resetForm() {
    this.newTodoTitle = "";
    this.newTodoPriority = 'medium';
    this.newTodoDueDate = '';
    this.newTodoCategory = 'Trabajo';
  }

  setCategory(category: string) {
    this.newTodoCategory = category;
  }

  setPriority(priority: string) {
    this.newTodoPriority = priority as 'high' | 'medium' | 'low';
  }

  getCategoryData(value: string) {
    return this.categories.find(cat => cat.value === value);
  }

  getPriorityData(value: string) {
    return this.priorities.find(pri => pri.value === value);
  }
}
