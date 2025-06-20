import { Component, Output, EventEmitter, Input, OnInit, OnChanges } from '@angular/core';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.html',
  styleUrl: './add-task-modal.scss',
  standalone: false
})
export class AddTaskModalComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() editingTodo: Todo | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() taskCreated = new EventEmitter<Todo>();
  @Output() taskUpdated = new EventEmitter<Todo>();

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

  ngOnInit() {
    if (this.editingTodo) {
      this.loadTodoData();
    }
  }

  ngOnChanges() {
    if (this.editingTodo && this.isOpen) {
      this.loadTodoData();
    } else if (!this.editingTodo && this.isOpen) {
      this.resetForm();
    }
  }

  close() {
    this.resetForm();
    this.closeModal.emit();
  }

  onSubmit() {
    if (!this.newTodoTitle.trim() || !this.newTodoDueDate) {
      return;
    }

    if (this.editingTodo) {
      // Update existing todo
      const updatedTodo = new Todo(
        this.editingTodo.id,
        this.newTodoTitle.trim(),
        this.editingTodo.isComplete,
        this.newTodoPriority,
        new Date(this.newTodoDueDate),
        this.newTodoCategory
      );
      this.taskUpdated.emit(updatedTodo);
    } else {
      // Create new todo
      const newTodo = new Todo(
        Date.now(),
        this.newTodoTitle.trim(),
        false,
        this.newTodoPriority,
        new Date(this.newTodoDueDate),
        this.newTodoCategory
      );
      this.taskCreated.emit(newTodo);
    }
    
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

  private loadTodoData() {
    if (this.editingTodo) {
      this.newTodoTitle = this.editingTodo.title;
      this.newTodoPriority = this.editingTodo.priority;
      this.newTodoCategory = this.editingTodo.category;
      this.newTodoDueDate = this.formatDateForInput(this.editingTodo.dueDate);
    }
  }

  private formatDateForInput(date: Date | string): string {
    // Handle both Date objects and date strings from localStorage
    const d = typeof date === 'string' ? new Date(date) : date;
    
    // Check if date is valid
    if (isNaN(d.getTime())) {
      console.warn('Invalid date provided to formatDateForInput:', date);
      return '';
    }
    
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  get modalTitle(): string {
    return this.editingTodo ? 'Edit Task' : 'Create New Task';
  }

  get submitButtonText(): string {
    return this.editingTodo ? 'Update Task' : 'Create Task';
  }
}
