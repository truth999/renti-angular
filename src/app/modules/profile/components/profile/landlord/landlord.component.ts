import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { AuthService } from '../../../../../core/services/auth.service';

import { Landlord } from '../../../../../shared/models';
import { LandlordService } from '../../../../my-profile/services/landlord.service';

@Component({
  selector: 'app-profile-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.scss']
})
export class LandlordComponent implements OnInit {
  user: any;
  landlord: Landlord;
  landlordId: string;

  constructor(
    private location: Location,
    private authService: AuthService,
    private landlordService: LandlordService
  ) { }

  async ngOnInit() {
    try {
      const responseUser = await this.authService.getUser();
      this.user = responseUser.user;
      this.landlordId = responseUser.user.landlordId;
    } finally {
    }

    try {
      if (!!this.landlordId) {
        const response = await this.landlordService.getLandlord(this.landlordId);
        this.landlord = response.landlord;
      }
    } finally {
    }
  }

  onBack() {
    this.location.back();
  }

}
