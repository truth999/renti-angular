import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { Apartment } from '../../models';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-apartment-item',
  templateUrl: './apartment-item.component.html',
  styleUrls: ['./apartment-item.component.scss']
})
export class ApartmentItemComponent implements OnInit {
  @Input() apartment: Apartment;
  @ViewChild('explainParagraph') explainParagraph: ElementRef;

  uploadBase = environment.uploadBase;

  constructor() { }

  ngOnInit() {
  }

  ellipsizeTextBox() {
    const el = this.explainParagraph.nativeElement;
    const wordArray = el.textContent.split(' ');

    while (el.scrollHeight > el.offsetHeight) {
      wordArray.pop();
      el.textContent = wordArray.join(' ') + '...';
    }
  }

}
