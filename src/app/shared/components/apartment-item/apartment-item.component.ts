import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { Apartment } from '../../models';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-apartment-item',
  templateUrl: './apartment-item.component.html',
  styleUrls: ['./apartment-item.component.scss']
})
export class ApartmentItemComponent implements OnInit, AfterViewInit {
  @Input() apartment: Apartment;
  @ViewChild('explainParagraph') explainParagraph: ElementRef;
  explain = 'Classic Lorem Ipsum text contains Latin words derived from the works of Cicero. According to…';
  data = 98;
  topRated = true;

  uploadBase = environment.uploadBase;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.ellipsizeTextBox();
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
