import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.scss']
})
export class ApartmentComponent implements OnInit {
  step = 0;

  constructor() { }

  ngOnInit() {
  }

  onNextStep() {
    this.step = this.step + 1;
  }

  onPreviewStep() {
    this.step = this.step - 1;

    if (this.step < 0) {
      this.step = 0;
    }
  }

}
