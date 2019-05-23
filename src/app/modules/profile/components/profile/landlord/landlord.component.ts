import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Landlord } from '../../../../../shared/models';

import { LandlordService } from '../../../../my-profile/services/landlord.service';

import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-profile-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.scss']
})
export class LandlordComponent implements OnInit {
  @Input() landlordId: string;
  @Input() user: any;
  landlord: Landlord;
  uploadBase = environment.uploadBase;

  constructor(
    private location: Location,
    private landlordService: LandlordService
  ) { }

  async ngOnInit() {
    try {
      const response = await this.landlordService.getLandlord(this.landlordId);
      this.landlord = response.landlord;
    } catch (e) {
      console.log('LandlordComponent->ngOnInit', e);
    }
  }

  onBack() {
    this.location.back();
  }

}
