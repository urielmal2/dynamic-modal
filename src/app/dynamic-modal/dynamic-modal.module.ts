import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { DynamicModalComponent } from './components/dynamic-modal/dynamic-modal.component';
import { DynamicModalService } from './components/dynamic-modal/dynamic-modal.service';
import {TempComponentComponent} from '../temp-component/temp-component.component';


const components = [DynamicModalComponent];

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: components,
  exports: components,
  entryComponents: [
    DynamicModalComponent,
    TempComponentComponent
  ],
  providers: [
    DynamicModalService
  ]
})

export class DynamicModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DynamicModalModule,
      providers: [ DynamicModalService ]
    };
  }
}
