import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  @Input() rate: number;

  constructor() { }

  ngOnInit() {
    this.rate = Math.floor(this.rate) + 1;
    if (this.rate > 5) {
      this.rate = 5;
    }
  }

}
