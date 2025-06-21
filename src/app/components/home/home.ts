import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';
import { TodoService } from '../../services/todo.service';
import { NoteService } from '../../services/note.service';
import { Todo } from '../../models/todo.model';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgIconsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {
  @Output() navigationChange = new EventEmitter<'home' | 'tasks' | 'notes'>();

  recentTodos: Todo[] = [];
  recentNotes: Note[] = [];
  
  // Statistics
  totalTodos: number = 0;
  pendingTodos: number = 0;
  overdueTodos: number = 0;
  totalNotes: number = 0;
  favoriteNotes: number = 0;

  // Expose Math to template
  Math = Math;

  constructor(
    private todoService: TodoService,
    private noteService: NoteService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    // Load recent items
    this.recentTodos = this.todoService.getRecent(4);
    this.recentNotes = this.noteService.getRecent(4);
    
    // Load statistics
    this.totalTodos = this.todoService.getAll().length;
    this.pendingTodos = this.todoService.getPendingCount();
    this.overdueTodos = this.todoService.getOverdueCount();
    this.totalNotes = this.noteService.getAll().length;
    this.favoriteNotes = this.noteService.getFavorites().length;
  }

  formatDate(date: Date): string {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Hoy';
    } else if (diffDays === 1) {
      return 'Ayer';
    } else if (diffDays < 7) {
      return `${diffDays} días`;
    } else {
      return date.toLocaleDateString('es-ES', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return '';
    }
  }

  truncateContent(content: string, limit: number = 60): string {
    if (content.length <= limit) return content;
    return content.substring(0, limit) + '...';
  }

  isOverdue(dueDate: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(dueDate) < today;
  }

  isDueSoon(dueDate: Date): boolean {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const dueDateTime = new Date(dueDate);
    return dueDateTime.getTime() <= tomorrow.getTime() && dueDateTime.getTime() >= today.getTime();
  }

  goToTasks(): void {
    this.navigationChange.emit('tasks');
  }

  goToNotes(): void {
    this.navigationChange.emit('notes');
  }
}