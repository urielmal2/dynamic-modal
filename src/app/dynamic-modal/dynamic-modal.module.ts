import {ModuleWithProviders, NgModule} from '@angular/core';
import {DynamicModalService} from './dynamic-modal.service';
import {StandardModalComponent} from "./components/standard-modal/standard-modal.component";
import {BasicControllersModule} from "../basic-controllers/basic-controllers.module";
import {CommonModule} from "@angular/common";

const components = [
	StandardModalComponent
];

@NgModule({
	imports: [
		CommonModule,
		BasicControllersModule
	],
	declarations: [...components],
	exports: [...components],
	entryComponents: [...components],
	providers: [DynamicModalService]
})

export class DynamicModalModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: DynamicModalModule,
			providers: [DynamicModalService]
		};
	}
}
