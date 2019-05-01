import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { LANDLORD_PROFILES } from '../../../../shared/db/db';

@Component({
  selector: 'app-profile-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.scss']
})
export class LandlordComponent implements OnInit {
  firstName = LANDLORD_PROFILES.firstName;
  lastName = LANDLORD_PROFILES.lastName;
  nationality = LANDLORD_PROFILES.nationality;
  spokenLanguages = LANDLORD_PROFILES.spokenLanguages.join(', ');

  constructor(private location: Location) { }

  ngOnInit() {
  }

  onBack() {
    this.location.back();
  }

}
