import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IModalData} from './modal-data.interface';

@Component({
  selector: 'app-dynamic-modal',
  templateUrl: './dynamic-modal.component.html',
  styleUrls: ['./dynamic-modal.component.css'],
})

export class DynamicModalComponent {

  @Input() modalMetaData;

  _modalData;
  get modalData(): IModalData {return this._modalData;}
  @Input() set modalData(value: IModalData) {this._modalData = value;}

  @Output() modalClose = new EventEmitter();


  closeModal() {
    this.modalClose.emit(true);
  }

  }
