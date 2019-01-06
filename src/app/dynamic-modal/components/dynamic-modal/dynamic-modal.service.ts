import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { DynamicModalComponent } from './dynamic-modal.component';

@Injectable()
export class DynamicModalService {

  componentRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
) {}

  openModal(modalData) {
    // 1. Create a components reference from the components
    this.componentRef = this.componentFactoryResolver.resolveComponentFactory(DynamicModalComponent).create(this.injector);

    // 2. Attach components to the appRef so that it's inside the ng components tree
    this.appRef.attachView(this.componentRef.hostView);

    // 3. Get DOM element from components
    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    // 4. Listen to close modal event
    this.ModalCloseListener();

    // 5. Assign modal data
    this.componentRef.instance.modalData = modalData;

    // 6. Append DOM element to the body
    document.body.appendChild(domElem);
  }

  ModalCloseListener() {
   const modalCloseSubscription = this.componentRef.instance.modalClose.subscribe((isCloseModal) => {
      if (isCloseModal) {
        this.closeModal();
        modalCloseSubscription.unsubscribe();
      }
    });
  }

  closeModal() {
    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
  }
}
