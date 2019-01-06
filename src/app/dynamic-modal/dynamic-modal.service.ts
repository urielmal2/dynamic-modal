import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { DynamicModalComponent } from './component/dynamic-modal.component';

@Injectable()
export class DynamicModalService {

  componentRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
) {}

  openModal(modalData, component = DynamicModalComponent) {
    // 1. Create a component reference from the component
    this.componentRef = this.componentFactoryResolver.resolveComponentFactory(component).create(this.injector);

    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(this.componentRef.hostView);

    // 3. Get DOM element from component
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
