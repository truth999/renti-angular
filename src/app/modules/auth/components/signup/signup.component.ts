import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  generalStep = 0;

  constructor() { }

  ngOnInit() {
  }

  nextStep() {
    this.generalStep = this.generalStep + 1;

    if (this.generalStep > 6) {
      this.generalStep = 6;
    }
  }

  previewStep() {
    this.generalStep = this.generalStep - 1;
  }

}
