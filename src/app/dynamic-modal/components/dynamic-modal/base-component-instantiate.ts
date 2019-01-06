import {ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injector} from '@angular/core';

export class BaseComponentInstantiate {

  componentRef;

  constructor(
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected appRef: ApplicationRef,
    protected injector: Injector,
  ) {}

  instantiateComponent(component, anchorElement, componentData?) {
    // 1. Create a components reference from the components
    this.componentRef = this.componentFactoryResolver.resolveComponentFactory(component).create(this.injector);

    // 2. Attach components to the appRef so that it's inside the ng components tree
    this.appRef.attachView(this.componentRef.hostView);

    // 3. Get DOM element from components
    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    // 4. Assign modal data
    if (componentData) {
      this.componentRef.instance.modalData = componentData;
    }

    // 5. Append DOM element to the body
    document.querySelector(anchorElement).appendChild(domElem);
  }
}
