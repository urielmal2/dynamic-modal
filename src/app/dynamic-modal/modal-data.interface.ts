import {BUTTON_TYPES, MODAL_CHILD_COMPONENTS, MODAL_HEADER_BACKGROUND_COLOR} from './modals-type-components.enum';

export interface DynamicModalDate {
	content?: ContentModalData;
	componentModal?: ModalComponentData;
	modalChildComponent?: MODAL_CHILD_COMPONENTS;
	buttons?: ButtonSettings[];
	modalConfig?: ModalConfig;
}

export interface ContentModalData {
	modalHeaderTextOrHtml?: string;
	modalMainTextOrHtml?: any;
	modalFooterTextOrHtml?: string;
	modalStyleForCostumeHtml?: string;
}

export interface ButtonSettings {
	title?: string;
	callback?: (event?) => any;
	buttonType?: BUTTON_TYPES;
	DontCloseModalAfterClick?: boolean;
}

interface ModalComponentData {
	component?: Function;
	componentDataBinding?: ComponentDataBinding;
}

export interface ComponentDataBinding {
	componentInputs?: ComponentInputs[];
	componentOutputs?: ComponentOutputs[];
}

export interface ModalConfig {
	isHeader?: boolean;
	isFooter?: boolean;
	headerColor?: MODAL_HEADER_BACKGROUND_COLOR;
}

interface ComponentInputs {
	inputName?: string;
	inputData?: any;
}

interface ComponentOutputs {
	outputName?: string;
	outputCallback?: (event) => any;
	modalClose?: string;
}
