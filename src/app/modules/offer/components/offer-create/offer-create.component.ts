import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer-create',
  templateUrl: './offer-create.component.html',
  styleUrls: ['./offer-create.component.scss']
})
export class OfferCreateComponent implements OnInit {
  isPet = false;
  years = (new Date()).getFullYear();
  daysNumber = 31;

  constructor(
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onBack() {
    this.location.back();
  }

  onSubmit() {
    this.router.navigate(['/app/offers/create-success']);
  }

  onChange(event) {
    this.isPet = event.target.value === 'yes';
  }

  arrayNumber(n: number) {
    return Array(n);
  }

}
