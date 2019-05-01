import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  role: string;
  generalStep = 0;

  constructor() { }

  ngOnInit() {
  }

  onRole(role: string) {
    this.role = role;
  }

  nextStep() {
    this.generalStep = this.generalStep + 1;

    if (this.role === 'landlord') {
      if (this.generalStep > 2) {
        this.generalStep = 6;
      }
    } else if (this.generalStep > 6) {
      this.generalStep = 6;
    }
  }

  previewStep() {
    this.generalStep = this.generalStep - 1;
  }

}
