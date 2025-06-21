import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent {
  title = 'NgNotes';
  currentView: 'home' | 'tasks' | 'notes' = 'home';

  switchView(view: 'home' | 'tasks' | 'notes'): void {
    this.currentView = view;
  }
}
