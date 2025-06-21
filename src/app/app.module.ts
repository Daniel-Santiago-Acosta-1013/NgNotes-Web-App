import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import { heroPlus, heroXMark, heroPencil, heroTrash, heroCheck, heroCalendar, heroFolder, heroClock, heroDocumentText, heroHashtag, heroMagnifyingGlass, heroListBullet, heroSquares2x2, heroStar, heroSun, heroClipboardDocumentList, heroChartBarSquare, heroArrowRight, heroCheckCircle, heroMinus, heroCalendarDays, heroClipboardDocumentCheck, heroDocumentPlus, heroPencilSquare } from '@ng-icons/heroicons/outline';
import { heroStarSolid } from '@ng-icons/heroicons/solid';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list.component';
import { ModalComponent } from './components/modal/modal';
import { AddTaskModalComponent } from './components/add-task-modal/add-task-modal';
import { ConfirmationDialog } from './components/confirmation-dialog/confirmation-dialog';
import { NoteListComponent } from './components/note-list.component';
import { AddNoteModalComponent } from './components/add-note-modal/add-note-modal';
import { HomeComponent } from './components/home/home';
import { FooterComponent } from './components/footer/footer.component';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    ModalComponent,
    AddTaskModalComponent,
    ConfirmationDialog,
    NoteListComponent,
    AddNoteModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxEditorModule,
    HomeComponent,
    FooterComponent,
    NgIconsModule.withIcons({ heroPlus, heroXMark, heroPencil, heroTrash, heroCheck, heroCalendar, heroFolder, heroClock, heroDocumentText, heroHashtag, heroMagnifyingGlass, heroListBullet, heroSquares2x2, heroStar, heroStarSolid, heroSun, heroClipboardDocumentList, heroChartBarSquare, heroArrowRight, heroCheckCircle, heroMinus, heroCalendarDays, heroClipboardDocumentCheck, heroDocumentPlus, heroPencilSquare })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
