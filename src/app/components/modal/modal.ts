import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
  standalone: false
})
export class ModalComponent implements OnInit, OnDestroy, OnChanges {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() showCloseButton = true;
  @Input() closeOnBackdropClick = true;
  @Input() closeOnEscape = true;
  
  @Output() closeModal = new EventEmitter<void>();
  @Output() modalOpened = new EventEmitter<void>();
  @Output() modalClosed = new EventEmitter<void>();

  ngOnInit() {
    if (this.closeOnEscape) {
      document.addEventListener('keydown', this.handleEscapeKey);
    }
    
    if (this.isOpen) {
      this.handleModalOpen();
    }
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.handleEscapeKey);
    this.enableBodyScroll();
  }

  ngOnChanges() {
    if (this.isOpen) {
      this.handleModalOpen();
    } else {
      this.handleModalClose();
    }
  }

  close() {
    this.closeModal.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if (this.closeOnBackdropClick && event.target === event.currentTarget) {
      this.close();
    }
  }

  private handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.isOpen) {
      this.close();
    }
  };

  private handleModalOpen() {
    this.disableBodyScroll();
    this.modalOpened.emit();
  }

  private handleModalClose() {
    this.enableBodyScroll();
    this.modalClosed.emit();
  }

  private disableBodyScroll() {
    document.body.style.overflow = 'hidden';
  }

  private enableBodyScroll() {
    document.body.style.overflow = '';
  }
}
