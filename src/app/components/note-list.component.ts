import { Component, OnInit } from '@angular/core';
import { Note } from '../models/note.model';
import { NoteService } from '../services/note.service';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
  standalone: false
})
export class NoteListComponent implements OnInit {
  notes: Note[] = [];
  selectedCategory: string = 'all';
  isAddModalOpen = false;
  editingNote: Note | null = null;
  viewMode: 'grid' | 'list' = 'list'; // Default to list for responsive
  searchQuery: string = '';

  categories = [
    { value: 'all', label: 'All Notes', color: '#6366f1' },
    { value: 'Personal', label: 'Personal', color: '#3b82f6' },
    { value: 'Work', label: 'Work', color: '#10b981' },
    { value: 'Ideas', label: 'Ideas', color: '#f59e0b' },
    { value: 'Projects', label: 'Projects', color: '#ef4444' }
  ];

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.loadNotes();
  }

  openAddNoteModal(): void {
    this.editingNote = null;
    this.isAddModalOpen = true;
  }

  openEditNoteModal(note: Note): void {
    this.editingNote = note;
    this.isAddModalOpen = true;
  }

  closeAddNoteModal(): void {
    this.isAddModalOpen = false;
    this.editingNote = null;
  }

  onNoteCreated(note: Note): void {
    this.noteService.add(note);
    this.loadNotes();
    
    Swal.fire({
      icon: 'success',
      title: 'Note Created!',
      text: `"${note.title}" has been added to your notes.`,
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    });
  }

  onNoteUpdated(updatedNote: Note): void {
    this.noteService.update(updatedNote);
    this.loadNotes();
    
    Swal.fire({
      icon: 'success',
      title: 'Note Updated!',
      text: `"${updatedNote.title}" has been updated.`,
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    });
  }

  deleteNote(id: number): void {
    const note = this.notes.find(n => n.id === id);
    if (!note) return;

    Swal.fire({
      title: 'Delete Note?',
      text: `Are you sure you want to delete "${note.title}"? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.noteService.delete(id);
        this.loadNotes();
        
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Note has been deleted.',
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          position: 'top-end'
        });
      }
    });
  }

  toggleFavorite(id: number): void {
    this.noteService.toggleFavorite(id);
    this.loadNotes();
  }

  filterByCategory(): void {
    if (this.selectedCategory === 'all') {
      this.notes = this.noteService.getAll();
    } else if (this.selectedCategory === 'favorites') {
      this.notes = this.noteService.getFavorites();
    } else {
      this.notes = this.noteService.getByCategory(this.selectedCategory);
    }
  }

  setFilter(category: string): void {
    this.selectedCategory = category;
    this.filterByCategory();
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.notes = this.noteService.searchNotes(this.searchQuery);
    } else {
      this.filterByCategory();
    }
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
  }

  getCategoryLabel(value: string): string {
    const category = this.categories.find(cat => cat.value === value);
    return category ? category.label : value;
  }

  formatDate(date: Date): string {
    return formatDate(date, 'MMM d, y', 'en-US');
  }

  formatDateTime(date: Date): string {
    return formatDate(date, 'MMM d, y, h:mm a', 'en-US');
  }

  getPreviewText(content: string): string {
    // Remove HTML tags and get first 150 characters
    const plainText = content.replace(/<[^>]*>/g, '');
    return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
  }

  trackByNote(index: number, note: Note): number {
    return note.id;
  }

  private loadNotes(): void {
    this.filterByCategory();
  }
}