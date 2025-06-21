import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';

@Injectable({
    providedIn: 'root',
})
export class NoteService {
    private notes: Note[] = [];

    constructor() {
        this.loadFromStorage();
    }

    getAll(): Note[] {
        return this.notes.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    }

    add(note: Note): void {
        this.notes.push(note);
        this.saveToStorage();
    }

    update(updatedNote: Note): void {
        const index = this.notes.findIndex(note => note.id === updatedNote.id);
        if (index !== -1) {
            updatedNote.updatedAt = new Date();
            this.notes[index] = updatedNote;
            this.saveToStorage();
        }
    }

    delete(id: number): void {
        this.notes = this.notes.filter(note => note.id !== id);
        this.saveToStorage();
    }

    getByCategory(category: string): Note[] {
        return this.notes.filter(note => note.category === category)
            .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    }

    getFavorites(): Note[] {
        return this.notes.filter(note => note.isFavorite)
            .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    }

    toggleFavorite(id: number): void {
        const note = this.notes.find(note => note.id === id);
        if (note) {
            note.isFavorite = !note.isFavorite;
            note.updatedAt = new Date();
            this.saveToStorage();
        }
    }

    searchNotes(query: string): Note[] {
        const searchTerm = query.toLowerCase();
        return this.notes.filter(note => 
            note.title.toLowerCase().includes(searchTerm) ||
            note.content.toLowerCase().includes(searchTerm) ||
            note.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        ).sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    }

    private loadFromStorage(): void {
        const storedNotes = localStorage.getItem('notes');
        if (storedNotes) {
            this.notes = JSON.parse(storedNotes).map((note: any) => ({
                ...note,
                createdAt: new Date(note.createdAt),
                updatedAt: new Date(note.updatedAt)
            }));
        }
    }

    private saveToStorage(): void {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    getRecent(limit: number = 5): Note[] {
        return this.notes
            .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
            .slice(0, limit);
    }

    getTotalCount(): number {
        return this.notes.length;
    }

    getFavoritesCount(): number {
        return this.notes.filter(note => note.isFavorite).length;
    }
}