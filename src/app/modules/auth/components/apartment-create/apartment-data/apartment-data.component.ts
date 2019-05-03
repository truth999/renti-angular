import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apartment-data',
  templateUrl: './apartment-data.component.html',
  styleUrls: ['./apartment-data.component.scss']
})
export class ApartmentDataComponent implements OnInit {
  mediaService = [
    'UPC', 'DIGI', 'Telekom', 'Other'
  ];

  constructor() { }

  ngOnInit() {
  }

  arrayNumber(n: number) {
    return Array(n);
  }

}
