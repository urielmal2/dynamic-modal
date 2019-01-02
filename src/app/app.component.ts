import {Component, OnInit} from '@angular/core';
import {ModalInjectorService} from './dynamic-modal/modal-injector.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor (private modalInjectorService: ModalInjectorService) {}

  ngOnInit() {
  }

  openModal() {
    const modalData = {
      headerContent: 'Modal Header',
      bodyContent: 'Modal Body',
      footerContent: 'Modal Footer'
  };
    this.modalInjectorService.openModal(modalData);
  }
}
