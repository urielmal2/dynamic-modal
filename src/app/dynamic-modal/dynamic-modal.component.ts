import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-dynamic-modal',
  templateUrl: './dynamic-modal.component.html',
  styleUrls: ['./dynamic-modal.component.css'],
})

export class DynamicModalComponent {

  @Output() modalClose = new EventEmitter();

  closeModal() {
    this.modalClose.emit(true);
  }

  }
