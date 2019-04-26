import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.scss']
})
export class LandlordComponent implements OnInit {

  constructor(
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onBack() {
    this.location.back();
  }

  onMyProperties() {
    this.router.navigate(['/app/rentals/my-properties']);
  }

  onSettings() {
    this.router.navigate(['/app/settings']);
  }

}
