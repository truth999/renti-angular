import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { environment } from '../../../../../environments/environment';

import { AuthService } from '../../../../core/services/auth.service';
import { LandlordService } from '../../services/landlord.service';

import { Landlord } from '../../../../shared/models';

@Component({
  selector: 'app-profile-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.scss']
})
export class LandlordComponent implements OnInit {
  landlord: Landlord;
  uploadBase = environment.uploadBase;
  rate: number;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private authService: AuthService,
    private landlordService: LandlordService
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    try {
      const response = await this.landlordService.getLandlord(id);
      const landlord = response.landlord;
      if (landlord.feedback.length !== 0) {
        const totalRate = landlord.feedback.reduce((total, currentValue) => {
          return total + currentValue.feedbackStar;
        }, 0);
        this.rate = parseInt((totalRate / landlord.feedback.length).toFixed(0), 10) - 1;
      }
      this.landlord = landlord;
    } catch (e) {
      console.log('LandlordComponent->ngOnInit', e);
    }
  }

  dateFormat(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('.');
  }

  onBack() {
    this.location.back();
  }

}
