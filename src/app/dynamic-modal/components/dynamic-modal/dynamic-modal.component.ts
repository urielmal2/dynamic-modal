import {ApplicationRef, Component, ComponentFactoryResolver, EventEmitter, Injector, Input, OnInit, Output} from '@angular/core';
import {IModalData} from '../../modal-data.interface';
import {DomSanitizer} from '@angular/platform-browser';
import {isFunction, isUndefined} from 'lodash';
import {BaseComponentInstantiate} from './base-component-instantiate';

@Component({
  selector: 'app-dynamic-modal',
  templateUrl: './dynamic-modal.component.html',
  styleUrls: ['./dynamic-modal.component.scss'],
})

export class DynamicModalComponent extends BaseComponentInstantiate implements OnInit {

  @Input() modalMetaData;
  _modalData;
  get modalData() {
    return this._modalData;
  }

  @Input() set modalData(value) {
    if (isUndefined(this.isComponentModalData)) {
      this._modalData = value;
      this.isComponentModalData = isFunction(this.modalData);
    }
  }

  @Output() modalClose = new EventEmitter();
  modalContent: IModalData = {} as IModalData;
  isComponentModalData: boolean;

  constructor(
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected appRef: ApplicationRef,
    protected injector: Injector,
    private sanitizer: DomSanitizer
  ) {
    super(componentFactoryResolver, appRef, injector);
  }

  ngOnInit() {
    if (!this.isComponentModalData) {
      this.anabelHtmlOfString();
    } else {
      this.instantiateComponent(this.modalData, 'app-dynamic-modal .modal-content');
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
