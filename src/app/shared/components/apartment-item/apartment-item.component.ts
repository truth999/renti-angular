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
  @Input() apartmentSummary: boolean;
  @ViewChild('addressParagraph') addressParagraph: ElementRef;

  uploadBase = environment.uploadBase;

  constructor() { }

  ngOnInit() {
    this.ellipsizeTextBox();
  }

  ellipsizeTextBox() {
    const el = this.addressParagraph.nativeElement;
    const wordArray = el.textContent.split(' ');

    while (el.scrollHeight > el.offsetHeight) {
      wordArray.pop();
      el.textContent = wordArray.join(' ') + '...';
    }
  }

  dateFormat(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('.');
  }

}
