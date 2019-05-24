import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Landlord } from '../../../../../shared/models';

import { LandlordService } from '../../../../my-profile/services/landlord.service';
import { CursorWaitService } from '../../../../../core/services/cursor-wait.service';

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
    private landlordService: LandlordService,
    private cursorWaitService: CursorWaitService
  ) { }

  async ngOnInit() {
    try {
      this.cursorWaitService.enable();

      const response = await this.landlordService.getLandlord(this.landlordId);
      this.landlord = response.landlord;
    } catch (e) {
      console.log('LandlordComponent->ngOnInit', e);
    } finally {
      this.cursorWaitService.disable();
    }
  }

  onBack() {
    this.location.back();
  }

}
