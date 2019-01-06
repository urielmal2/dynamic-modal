import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TempComponentComponent } from './temp-component/temp-component.component';
import { DynamicModalModule } from './dynamic-modal/dynamic-modal.module';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TempComponentComponent
  ],
  imports: [
    BrowserModule,
    DynamicModalModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
