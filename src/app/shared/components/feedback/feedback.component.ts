import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  @Input() rate: number;
  @Input() number: number;

  constructor() { }

  ngOnInit() {
    this.rate = Math.floor(this.rate);
  }

}
