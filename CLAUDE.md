# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development
- `npm start` or `ng serve` - Start development server on http://localhost:4200
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run watch` - Build in watch mode for development
- `npm test` - Run unit tests with Karma/Jasmine

### Prerequisites
- Node.js 18+ and npm are required
- Angular CLI should be installed globally: `npm install -g @angular/cli`

## Project Architecture

### Application Structure
NgNotes is an Angular 20 web application for task and note management with dual functionality:
- **Task Management**: Todo items with priorities, due dates, and categories
- **Note Management**: Rich text notes with ngx-editor, tags, and favorites

### Key Components
- `AppComponent`: Root component with view switching between tasks/notes
- `TodoListComponent`: Task management interface
- `NoteListComponent`: Note management with rich text editing
- `AddTaskModalComponent` & `AddNoteModalComponent`: Modal dialogs for CRUD operations
- `ModalComponent`: Reusable modal wrapper
- `ConfirmationDialog`: Reusable confirmation dialogs

### Services & Data
- `TodoService`: Task CRUD operations with localStorage persistence
- `NoteService`: Note CRUD operations with search, favorites, categories
- **Data Models**: Todo (title, priority, dueDate, category) and Note (title, content, tags, favorite)
- **Storage**: Client-side localStorage (no backend)

### Technology Stack
- **Angular 20** with TypeScript 5.8
- **ngx-editor 19.0.0-beta.1** for rich text editing
- **ng-icons** with Heroicons for UI icons
- **SweetAlert2** for notifications and confirmations
- **SCSS** with CSS custom properties design system

### Project Configuration
- Uses traditional Angular modules (not standalone components)
- Angular project name: "angular-To-Do-List" (in angular.json)
- TypeScript strict mode enabled
- Bundle size limits: 500KB warning, 1MB error

### Development Notes
- No linting or formatting commands configured in package.json
- Tests use Karma + Jasmine setup
- Responsive design with modern CSS architecture
- Icon system uses ng-icons with Heroicons integration