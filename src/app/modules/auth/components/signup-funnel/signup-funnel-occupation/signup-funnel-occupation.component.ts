import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-funnel-occupation',
  templateUrl: './signup-funnel-occupation.component.html',
  styleUrls: ['./signup-funnel-occupation.component.scss']
})
export class SignupFunnelOccupationComponent implements OnInit {
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
