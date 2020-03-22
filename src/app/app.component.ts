import {Component, OnInit} from '@angular/core';
import {TempComponentComponent} from './temp-component/temp-component.component';
import {DynamicModalService} from './dynamic-modal/dynamic-modal.service';
import {BUTTON_TYPES, MODAL_CHILD_COMPONENTS, MODAL_HEADER_BACKGROUND_COLOR} from './dynamic-modal/modals-type-components.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor (private modalInjectorService: DynamicModalService) {}

  ngOnInit() {
  }

  openModal() {
    const modalData = {
      headerContent: '<h1>Modal Header</h1>',
      bodyContent: 'Modal Body',
      footerContent: 'Modal Footer'
  };

    const ComponentModalData = {
      componentModal: {
        component: TempComponentComponent
      },
      modalChildComponent: MODAL_CHILD_COMPONENTS.STANDARD,
      buttons: [{
        title: 'Close Modal',
      }]
    };
    this.modalInjectorService.openModal(ComponentModalData);
  }
}
