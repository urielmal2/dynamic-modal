import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IModalData} from '../../modal-data.interface';
import {DomSanitizer} from '@angular/platform-browser';
import {isFunction} from 'lodash';

@Component({
  selector: 'app-dynamic-modal',
  templateUrl: './dynamic-modal.component.html',
  styleUrls: ['./dynamic-modal.component.scss'],
})

export class DynamicModalComponent implements OnInit {

  @Input() modalMetaData;
  _modalData;
  get modalData() {
    return this._modalData;
  }

  @Input() set modalData(value) {
    this._modalData = value;
  }

  @Output() modalClose = new EventEmitter();
  modalContent: IModalData = {} as IModalData;
  isComponentModalData: boolean;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    if (!isFunction(this.modalData)) {
      this.anabelHtmlOfString();
    }
  }

  anabelHtmlOfString() {
    Object.keys(this.modalData).map((key) => {
      this.modalContent[key] = this.sanitizer.bypassSecurityTrustHtml(this.modalData[key]);
    });
  }

  closeModal() {
    this.modalClose.emit(true);
  }

}
