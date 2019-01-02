import {Component, OnInit} from '@angular/core';
import {ModalInjectorService} from './modal-injector.service';

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
    this.modalInjectorService.openModal();
  }
}
