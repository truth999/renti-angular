import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-person-agency',
  templateUrl: './signup-person-agency.component.html',
  styleUrls: ['./signup-person-agency.component.scss']
})
export class SignupPersonAgencyComponent implements OnInit {
  isAgency = false;

  constructor() { }

  ngOnInit() {
  }

  onChange(event) {
    this.isAgency = event.target.value === 'agency';
  }

}
