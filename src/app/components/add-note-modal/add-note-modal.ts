import { Component, Output, EventEmitter, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Note } from '../../models/note.model';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-add-note-modal',
  templateUrl: './add-note-modal.html',
  styleUrl: './add-note-modal.scss',
  standalone: false
})
export class AddNoteModalComponent implements OnInit, OnChanges, OnDestroy {
  @Input() isOpen = false;
  @Input() editingNote: Note | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() noteCreated = new EventEmitter<Note>();
  @Output() noteUpdated = new EventEmitter<Note>();

  // ngx-editor instance
  editor!: Editor;
  html = '';

  newNoteTitle: string = "";
  newNoteCategory: string = 'Personal';
  newNoteTags: string = "";

  // ngx-editor toolbar configuration
  toolbar: Toolbar = [
    // Formatting
    ['bold', 'italic', 'underline', 'strike'],
    // Headers
    ['blockquote'],
    // Lists
    ['ordered_list', 'bullet_list'],
    // Alignment
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    // Indentation
    ['indent', 'outdent'],
    // Colors
    ['text_color', 'background_color'],
    // Links and images
    ['link', 'image'],
    // Code and horizontal rule
    ['code', 'horizontal_rule'],
    // Clear formatting
    ['format_clear']
  ];

  categories = [
    { value: 'Personal', label: 'Personal', color: '#3b82f6', icon: '👤' },
    { value: 'Work', label: 'Work', color: '#10b981', icon: '💼' },
    { value: 'Ideas', label: 'Ideas', color: '#f59e0b', icon: '💡' },
    { value: 'Projects', label: 'Projects', color: '#ef4444', icon: '🚀' }
  ];

  ngOnInit(): void {
    // Initialize the editor
    this.editor = new Editor();
    
    if (this.editingNote) {
      this.loadNoteData();
    }
  }

  ngOnChanges(): void {
    if (this.editingNote && this.isOpen) {
      this.loadNoteData();
    } else if (!this.editingNote && this.isOpen) {
      this.resetForm();
    }
  }

  ngOnDestroy(): void {
    // Important: Destroy the editor instance to prevent memory leaks
    if (this.editor) {
      this.editor.destroy();
    }
  }

  close(): void {
    this.resetForm();
    this.closeModal.emit();
  }

  onSubmit(): void {
    if (!this.newNoteTitle.trim()) {
      return;
    }

    const tags = this.newNoteTags ? 
      this.newNoteTags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];

    if (this.editingNote) {
      // Update existing note
      const updatedNote = new Note(
        this.editingNote.id,
        this.newNoteTitle.trim(),
        this.html, // Use html from ngx-editor
        this.editingNote.createdAt,
        new Date(),
        this.newNoteCategory,
        this.editingNote.isFavorite,
        tags
      );
      this.noteUpdated.emit(updatedNote);
    } else {
      // Create new note
      const newNote = new Note(
        Date.now(),
        this.newNoteTitle.trim(),
        this.html, // Use html from ngx-editor
        new Date(),
        new Date(),
        this.newNoteCategory,
        false,
        tags
      );
      this.noteCreated.emit(newNote);
    }
    
    this.close();
  }

  private resetForm(): void {
    this.newNoteTitle = "";
    this.html = "";
    this.newNoteCategory = 'Personal';
    this.newNoteTags = "";
  }

  private loadNoteData(): void {
    if (this.editingNote) {
      this.newNoteTitle = this.editingNote.title;
      this.html = this.editingNote.content;
      this.newNoteCategory = this.editingNote.category;
      this.newNoteTags = this.editingNote.tags.join(', ');
    }
  }

  setCategory(category: string): void {
    this.newNoteCategory = category;
  }

  getCategoryData(value: string) {
    return this.categories.find(cat => cat.value === value);
  }

  get modalTitle(): string {
    return this.editingNote ? 'Edit Note' : 'Create New Note';
  }

  get submitButtonText(): string {
    return this.editingNote ? 'Update Note' : 'Create Note';
  }
}