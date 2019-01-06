import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { DynamicModalComponent } from './components/dynamic-modal/dynamic-modal.component';
import { DynamicModalService } from './components/dynamic-modal/dynamic-modal.service';
import { TemplateModalComponent } from './components/template-modal/template-modal.component';


const components = [DynamicModalComponent, TemplateModalComponent];

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: components,
  exports: components,
  entryComponents: [
    DynamicModalComponent
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
