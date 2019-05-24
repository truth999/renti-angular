import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-profile-item',
  templateUrl: './profile-item.component.html',
  styleUrls: ['./profile-item.component.scss']
})
export class ProfileItemComponent implements OnInit, AfterViewInit {
  // @Input() imgUrl: string;
  // @Input() name: string;
  // @Input() explain: string;
  @Input() profile: any;
  @ViewChild('explainParagraph') explainParagraph: ElementRef;
  uploadBase = environment.uploadBase;

  constructor(private router: Router) { }

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
