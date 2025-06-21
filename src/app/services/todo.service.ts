import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
    providedIn: 'root',
})
export class TodoService {
    private todos: Todo[] = [];

    constructor() {
        this.loadFromStorage();
    }

    getAll() {
        return this.todos;
    }

    add(todo: Todo) {
        this.todos.push(todo);
        this.saveToStorage();
    }

    delete(id: number) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveToStorage();
    }

    updateTitle(id: number, newTitle: string) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.title = newTitle;
            this.saveToStorage();
        }
    }

    toggleCompletion(id: number) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.isComplete = !todo.isComplete;
            this.saveToStorage();
        }
    }

    getByCategory(category: string): Todo[] {
        return this.todos.filter(todo => todo.category === category);
    }

    getRecent(limit: number = 5): Todo[] {
        return this.todos
            .sort((a, b) => b.id - a.id)
            .slice(0, limit);
    }

    update(updatedTodo: Todo) {
        const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
        if (index !== -1) {
            this.todos[index] = updatedTodo;
            this.saveToStorage();
        }
    }

    private loadFromStorage() {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            this.todos = JSON.parse(storedTodos).map((todo: any) => ({
                ...todo,
                dueDate: new Date(todo.dueDate) // Ensure dueDate is a Date object
            }));
        }
    }

    private saveToStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    getPendingCount(): number {
        return this.todos.filter(todo => !todo.isComplete).length;
    }

    getOverdueCount(): number {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return this.todos.filter(todo => 
            !todo.isComplete && 
            todo.dueDate && 
            new Date(todo.dueDate) < today
        ).length;
    }
}
