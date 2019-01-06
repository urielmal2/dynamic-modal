import { BrowserModule } from '@angular/platform-browser';

import {ModuleWithProviders, NgModule} from '@angular/core';
import { DynamicModalComponent } from './component/dynamic-modal.component';
import { DynamicModalService } from './dynamic-modal.service';

const components = [DynamicModalComponent];

@NgModule({
  imports: [BrowserModule],
  declarations: components,
  entryComponents: components,
  providers: [DynamicModalService],
  exports: components
})

export class DynamicModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DynamicModalModule,
      providers: [ DynamicModalService ]
    };
  }
}
