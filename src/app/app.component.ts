import {Component, OnInit} from '@angular/core';
import {DynamicModalService} from './dynamic-modal/components/dynamic-modal/dynamic-modal.service';
import {TempComponentComponent} from './temp-component/temp-component.component';

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
    this.modalInjectorService.openModal(modalData);
  }
}
