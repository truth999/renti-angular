import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-offer-create-success',
  templateUrl: './offer-create-success.component.html',
  styleUrls: ['./offer-create-success.component.scss']
})
export class OfferCreateSuccessComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }

  onBack() {
    this.location.back();
  }

}
