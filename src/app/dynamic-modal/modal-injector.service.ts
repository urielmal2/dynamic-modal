import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { DynamicModalComponent } from './dynamic-modal.component';

@Injectable()
export class ModalInjectorService {

  componentRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
) {}

  openModal(modalData, component = DynamicModalComponent) {
    // 1. Create a component reference from the component
    this.componentRef = this.componentFactoryResolver.resolveComponentFactory(component).create(this.injector);
    console.log(this.componentRef)

    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(this.componentRef.hostView);

    // 3. Get DOM element from component
    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    // 4. Listen to close modal event
    this.closeModalListener();

    // 5. Assign modal data
    this.componentRef.instance.modalData = modalData;

    // 6. Append DOM element to the body
    document.body.appendChild(domElem);
  }

  closeModalListener() {
    this.componentRef.instance.modalClose.subscribe((isCloseModal) => {
      if (isCloseModal) {
        this.closeModal();
      }
    });
  }

  closeModal() {
    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
  }
}
