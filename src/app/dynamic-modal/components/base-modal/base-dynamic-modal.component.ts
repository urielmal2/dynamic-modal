import { AfterViewInit, ElementRef, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { map, isEmpty, isArray, isObject, isUndefined } from 'lodash';
import { ButtonSettings, ContentModalData, DynamicModalDate, ModalConfig } from "../../modal-data.interface";
import { BUTTON_TYPES, MODAL_CHILD_COMPONENTS, MODAL_HEADER_BACKGROUND_COLOR } from "../../modals-type-components.enum";


export class BaseDynamicModalComponent implements OnChanges, AfterViewInit {

	_modalData;
	get modalData(): DynamicModalDate {
		return this._modalData;
	}

	@Input('modalData')
	set modalData(value) {
		this.modalInit(value);
		this._modalData = value;
	}

	@Input() isServiceModal;
	@Input() isHeader = true;
	@Input() isFooter = true;
	@Input() headerColor = MODAL_HEADER_BACKGROUND_COLOR.BLUE;
	@Input() modalHeaderTextOrHtml: string;
	@Input() modalMainTextOrHtml: string;
	@Input() modalFooterTextOrHtml: string;
	@Input() buttons: ButtonSettings[];
	@Input() modalStyleForCostumeHtml;
	@Input() bindToThis;
	@Output() modalClose = new EventEmitter();
	@Output() ready$: EventEmitter<any> = new EventEmitter();

	isComponentModalData: boolean;
	isModalInitEnd: boolean;

	dynamicModalModel: DynamicModalDate = {
		content: {
			modalHeaderTextOrHtml: '',
			modalMainTextOrHtml: '',
			modalFooterTextOrHtml: '',
			modalStyleForCostumeHtml: ''
		},
		componentModal: {
			component: () => '',
			componentDataBinding: {
				componentInputs: [{
					inputName: '',
					inputData: ''
				}],
				componentOutputs: [{
					outputName: '',
					outputCallback: () => '',
					modalClose: ''
				}]
			}
		},
		modalChildComponent: MODAL_CHILD_COMPONENTS.STANDARD,
		buttons: [{
			title: '',
			callback: () => '',
			buttonType: BUTTON_TYPES.OK,
			DontCloseModalAfterClick: false
		}],
		modalConfig: {
			isHeader: true,
			isFooter: true,
			headerColor: MODAL_HEADER_BACKGROUND_COLOR.BLUE
		}
	};

	constructor(protected sanitizer: DomSanitizer, protected elem: ElementRef) {}

	ngOnChanges() {
		this.modalInit();
	}

	ngAfterViewInit() {
		this.ready$.emit(true);
	}

	modalInit(modalData?: DynamicModalDate) {
		if (!this.isModalInitEnd) {
			modalData = modalData ? modalData : {};
			this.isComponentModalData = !!modalData.componentModal;

			this.setModalContent(modalData.content);
			this.setStyleForInjectedHtml(this.modalStyleForCostumeHtml);
			this.setModalConfig(modalData.modalConfig);
			this.setButtons(modalData.buttons);
			this.isModalInitEnd = true;
		}
	}


	setModalContent(modalContent: ContentModalData) {
			map(this.dynamicModalModel.content, (value, key) => {
				value = modalContent && modalContent[key] ? modalContent[key] : this[key];
				this[key] = value ? this.enableHtmlOfString(value) : '';
			});
	}

	setModalConfig(modalConfig: ModalConfig) {
		map(this.dynamicModalModel.modalConfig, (value, key) => {
			value = modalConfig && !isUndefined(modalConfig[key]) ? modalConfig[key] : this[key];
			this[key] = value;
		});
	}

	setButtons(buttons: ButtonSettings[]) {
		this.buttons = isArray(this.buttons) && !isEmpty(this.buttons[0]) ? this.buttons :
			isArray(buttons) && !isEmpty(buttons[0]) ? buttons : undefined;

		if (this.buttons) {
			this.buttons.forEach((button) => {
				const fn = this.bindToThis && !this.isServiceModal ? button.callback.bind(this.bindToThis) : button.callback;
				button.callback = event => {
					fn(event);
					return !button.DontCloseModalAfterClick ? this.closeModal() : undefined;
				};
			});

		}
	}

	setStyleForInjectedHtml(modalCostumeHtmlStyle) {
		modalCostumeHtmlStyle = modalCostumeHtmlStyle || '';
		const style = '<style>h1, h2, h3, h4, h5, h6 {margin:0}' + modalCostumeHtmlStyle + '</style>';
		this.modalStyleForCostumeHtml = this.enableHtmlOfString(style);
	}

	enableHtmlOfString(textData) {
		return isArray(textData) || isObject(textData) ?
			map(textData, val => this.sanitizer.bypassSecurityTrustHtml(val)) :
			this.sanitizer.bypassSecurityTrustHtml(textData);
	}


	closeModal() {
		this.modalClose.emit(true);
	}

}
