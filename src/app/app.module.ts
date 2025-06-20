import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list.component';
import { ModalComponent } from './components/modal/modal';
import { AddTaskModalComponent } from './components/add-task-modal/add-task-modal';
import { ConfirmationDialog } from './components/confirmation-dialog/confirmation-dialog';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    ModalComponent,
    AddTaskModalComponent,
    ConfirmationDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
