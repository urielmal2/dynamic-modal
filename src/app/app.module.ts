import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { DynamicModalComponent } from './dynamic-modal/dynamic-modal.component';
import { TempComponentComponent } from './temp-component/temp-component.component';
import {ModalInjectorService} from './modal-injector.service';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    DynamicModalComponent,
    TempComponentComponent
  ],
  imports: [
    BrowserModule
  ],
  entryComponents: [DynamicModalComponent],
  providers: [ModalInjectorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
