import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generals',
  templateUrl: './generals.component.html',
  styleUrls: ['./generals.component.scss']
})
export class GeneralsComponent implements OnInit {
  generalStep = 0;

  constructor() { }

  ngOnInit() {
  }

  nextStep() {
    this.generalStep = this.generalStep + 1;
  }

}
