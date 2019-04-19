import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apartment-floor',
  templateUrl: './apartment-floor.component.html',
  styleUrls: ['./apartment-floor.component.scss']
})
export class ApartmentFloorComponent implements OnInit {
  counter = 0;

  constructor() { }

  ngOnInit() {
  }

  onPlus() {
    this.counter = this.counter + 1;
  }

  onMinus() {
    this.counter = this.counter - 1;

    if (this.counter < 0) {
      this.counter = 0;
    }
  }

}
