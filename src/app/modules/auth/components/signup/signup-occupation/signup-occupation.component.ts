import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-occupation',
  templateUrl: './signup-occupation.component.html',
  styleUrls: ['./signup-occupation.component.scss']
})
export class SignupOccupationComponent implements OnInit {
  addOccupation = 1;

  constructor() { }

  ngOnInit() {
  }

  onAddOccupation() {
    this.addOccupation++;
  }

  arrayNumber(n: number) {
    return Array(n);
  }

}
