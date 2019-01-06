import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { DynamicModalComponent } from './dynamic-modal.component';
import {BaseComponentInstantiate} from './base-component-instantiate';

@Injectable()
export class DynamicModalService extends BaseComponentInstantiate {

  constructor(
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected appRef: ApplicationRef,
    protected injector: Injector,
  ) {
  super(componentFactoryResolver, appRef, injector);
}

  openModal(modalData) {
    this.instantiateComponent(DynamicModalComponent, 'body', modalData);
    this.ModalCloseListener();
  }

  closeModal() {
    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
  }

  ModalCloseListener() {
   const modalCloseSubscription = this.componentRef.instance.modalClose.subscribe((isCloseModal) => {
      if (isCloseModal) {
        this.closeModal();
        modalCloseSubscription.unsubscribe();
      }
    });
  }

}
