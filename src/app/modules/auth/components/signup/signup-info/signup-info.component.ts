import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-info',
  templateUrl: './signup-info.component.html',
  styleUrls: ['./signup-info.component.scss']
})
export class SignupInfoComponent implements OnInit {
  @Input() role: string;
  isAgency = false;

  constructor() { }

  ngOnInit() {
  }

  onChange(event) {
    this.isAgency = event.target.value === 'agency';
  }

}
