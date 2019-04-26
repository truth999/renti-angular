import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onProfile() {
    this.router.navigate(['/app/profile/tenant']);
  }

  onSuccess() {
    this.router.navigate(['/app/offers/success']);
  }

}
