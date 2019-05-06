import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-funnel-person-agency',
  templateUrl: './signup-funnel-person-agency.component.html',
  styleUrls: ['./signup-funnel-person-agency.component.scss']
})
export class SignupFunnelPersonAgencyComponent implements OnInit {
  isAgency = false;

  constructor() { }

  ngOnInit() {
  }

  onChange(event) {
    this.isAgency = event.target.value === 'agency';
  }

}
