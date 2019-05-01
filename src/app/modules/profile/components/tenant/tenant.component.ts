import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TENANT_PROFILES } from '../../../../shared/db/db';

@Component({
  selector: 'app-profile-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss']
})
export class TenantComponent implements OnInit {
  // firstName = TENANT_PROFILES.firstName;
  // lastName = TENANT_PROFILES.lastName;
  // otherInformation = TENANT_PROFILES.otherInformation;
  // freeTextIntroduction = TENANT_PROFILES.freeTextIntroduction;
  // nationality = TENANT_PROFILES.nationality;
  // monthlyIncome = TENANT_PROFILES.monthlyIncome;
  // spokenLanguages = TENANT_PROFILES.spokenLanguages.join(', ');

  constructor(private location: Location) { }

  ngOnInit() {
  }

  onBack() {
    this.location.back();
  }

}
