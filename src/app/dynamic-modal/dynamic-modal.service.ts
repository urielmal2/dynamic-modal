import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { StandardModalComponent } from "./components/standard-modal/standard-modal.component";
import { DynamicModalDate, ComponentDataBinding } from "./modal-data.interface";
import { forEach, get, isEqual } from 'lodash';


@Injectable()
export class DynamicModalService {

	eventsSubscriptions = [];
	openModalsArray = [];
	modalData: DynamicModalDate;
	isComponentModal: boolean;
	modalChildComponents = {
		standardModalComponent: StandardModalComponent
	};

	constructor(
		protected componentFactoryResolver: ComponentFactoryResolver,
		protected appRef: ApplicationRef,
		protected injector: Injector,
	) {
	}

	openModal(modalData: DynamicModalDate): ComponentRef<any> {
		if (this.isOpenModal(modalData)) {
			return false as any;
		}
		this.isComponentModal = !!modalData.componentModal;
		const modalComponent = this.modalChildComponents[modalData.modalChildComponent] ?
			this.modalChildComponents[modalData.modalChildComponent] :
			this.modalChildComponents.standardModalComponent;
		return this.instantiateComponent(modalComponent, 'body', modalData);
	}

	closeModal(modalComponentRef: ComponentRef<any>, modalData?: DynamicModalDate) {
		this.appRef.detachView(modalComponentRef.hostView);
		modalComponentRef.destroy();
		this.removeFromOpenModalsArray(modalData);
	}

	isExistInOpenModalsArray(modalDataItem, openModalsArrayItem) {
		modalDataItem = JSON.stringify(modalDataItem.content) + JSON.stringify(get(modalDataItem, 'componentModal.component'));
		openModalsArrayItem = JSON.stringify(openModalsArrayItem.content) + JSON.stringify(get(openModalsArrayItem, 'componentModal.component'));
		return modalDataItem === openModalsArrayItem;
	}

	isOpenModal(modalData: DynamicModalDate) {
		let isModalOpen = false;

		forEach(this.openModalsArray, (val) => {
			if (this.isExistInOpenModalsArray(modalData, val)) {
				isModalOpen = true;
				return false;
			}
		});

		if (!isModalOpen) {
			this.modalData = modalData;
			this.openModalsArray.push(this.modalData);
		}

		return isModalOpen;
	}

	removeFromOpenModalsArray(modalData?: DynamicModalDate) {
		let index;
		forEach(this.openModalsArray, (val, idx) => {
			if (isEqual(modalData, val)) {
				index = idx;
				return false;
			}
		});
		this.openModalsArray.splice(index, 1);
	}

	instantiateComponent(component, anchorElement, componentData, modalComponentRef?: ComponentRef<any>): ComponentRef<any> {
		// Create a components reference from the components
		const componentRef: any = this.componentFactoryResolver.resolveComponentFactory(component).create(this.injector);

		// Attach components to the appRef so that it's inside the ng components tree
		this.appRef.attachView(componentRef.hostView);

		// Get DOM element from components
		const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

		// Get modal DOM element ref
		const documentOrModalElem = !modalComponentRef ? document : modalComponentRef.instance.elem.nativeElement;

		// Set modal component ref
		modalComponentRef = modalComponentRef ? modalComponentRef : componentRef;

			// Assign modal data
		this.modalDataBindManager(componentRef, this.setDataBind(componentData), modalComponentRef);

		// Append DOM element to the body
		documentOrModalElem.querySelector(anchorElement).appendChild(domElem);

		this.setComponentInModal(get(componentData, 'componentModal.component'), componentData.componentModal, modalComponentRef);

		return modalComponentRef;
	}

	setDataBind(dataBind): ComponentDataBinding {
		if (dataBind.componentDataBinding) {
			dataBind.componentDataBinding.componentInputs =
				[{inputName: 'isServiceModal', inputData: true}, ...dataBind.componentDataBinding.componentInputs];
			return dataBind.componentDataBinding;
		} else {
			return {
				componentOutputs: {eventData: {modalClose: 'modalClose'}} as any,
				componentInputs: [{inputName: 'modalData', inputData: dataBind}]
			};
		}
	}

	setComponentInModal(component, componentData, modalComponentRef) {
		if (this.isComponentModal) {
			const modalInstanceReady = modalComponentRef.instance.ready$.subscribe((modalReady: boolean) => {
				if (modalReady) {
					this.isComponentModal = false;
					this.instantiateComponent(component, '.modal-content', componentData, modalComponentRef);
					modalInstanceReady.unsubscribe();
				}
			});
		}
	}

	modalDataBindManager(componentRef, componentDataBinding, modalComponentRef: ComponentRef<any>) {
		const componentDataSettersMap = {
			componentInputs: this.setComponentInputs,
			componentOutputs: this.setComponentOutputs.bind(this)
		};
		forEach(componentDataBinding, (eventData, key) => {
			if (componentDataSettersMap[key]) {
				componentDataSettersMap[key](componentRef, eventData, modalComponentRef);
			}
		});
	}

	setComponentInputs(componentRef, inputsData) {
		// Inform component invoked by service
		componentRef.instance['isServiceModal'] = true;
		forEach(inputsData, (inputData) => {
			if (componentRef && componentRef.instance && inputData.inputName) {
				componentRef.instance[inputData.inputName] = inputData.inputData;
			}
		});
	}

	setComponentOutputs(componentRef, eventsData, modalComponentRef: ComponentRef<any>) {

		forEach(eventsData, (eventData) => {
			const eventName = eventData.modalClose ? eventData.modalClose : eventData.outputName;

				if (get(componentRef, 'instance[' + eventName + '].constructor.name') === 'EventEmitter') {
					const eventHandel = componentRef.instance[eventName].subscribe((event) => {
						if (eventData.modalClose) {
							this.closeModal(modalComponentRef, {...this.modalData});
						} else if (eventData.outputCallback) {
							eventData.outputCallback(event);
						}
				});
				this.eventsSubscriptions.push(eventHandel);
			}
		});
	}

}
