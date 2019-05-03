import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-education',
  templateUrl: './signup-education.component.html',
  styleUrls: ['./signup-education.component.scss']
})
export class SignupEducationComponent implements OnInit {
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
