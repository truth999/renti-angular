import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landlords',
  templateUrl: './landlords.component.html',
  styleUrls: ['./landlords.component.scss']
})
export class LandlordsComponent implements OnInit {
  currentRate = 5;

  constructor() { }

  ngOnInit() {
  }

}
