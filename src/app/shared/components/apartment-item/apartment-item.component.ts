import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-apartment-item',
  templateUrl: './apartment-item.component.html',
  styleUrls: ['./apartment-item.component.scss']
})
export class ApartmentItemComponent implements OnInit {
  @Input() imgUrl: string;
  @Input() name: string;
  @Input() explain: string;
  @Input() mo: number;
  @Input() square: number;
  @Input() rooms: number;
  @Input() data: number;
  @Input() topRated: boolean;
  @ViewChild('explainParagraph') explainParagraph: ElementRef;

  constructor() { }

  ngOnInit() {
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
