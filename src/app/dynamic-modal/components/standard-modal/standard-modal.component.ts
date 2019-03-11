import { Component, ElementRef } from '@angular/core';
import { BaseDynamicModalComponent } from "../base-modal/base-dynamic-modal.component";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
	selector: 'app-standard-modal',
	templateUrl: './standard-modal.component.html',
	styleUrls: ['./standard-modal.component.scss']
})

export class StandardModalComponent extends BaseDynamicModalComponent {

	constructor(protected sanitizer: DomSanitizer, protected elem: ElementRef) {
		super(sanitizer, elem);
	}

}
