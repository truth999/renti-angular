import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { environment } from '../../../../environments/environment';

import { Tenant } from '../../models';

@Component({
  selector: 'app-profile-item',
  templateUrl: './profile-item.component.html',
  styleUrls: ['./profile-item.component.scss']
})
export class ProfileItemComponent implements OnInit, AfterViewInit {
  @Input() profile: Tenant;
  @ViewChild('explainParagraph') explainParagraph: ElementRef;
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
