import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-funnel-education',
  templateUrl: './signup-funnel-education.component.html',
  styleUrls: ['./signup-funnel-education.component.scss']
})
export class SignupFunnelEducationComponent implements OnInit {
  addEducation = 1;

  constructor() { }

  ngOnInit() {
  }

  onAddEducation() {
    this.addEducation++;
  }

  arrayNumber(n: number) {
    return Array(n);
  }

}
