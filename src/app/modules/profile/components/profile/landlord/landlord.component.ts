import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { environment } from '../../../../../../environments/environment';

import { AuthService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-profile-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.scss']
})
export class LandlordComponent implements OnInit {
  @Input() user: any;
  uploadBase = environment.uploadBase;
  rate: number;

  constructor(
    private location: Location,
    private authService: AuthService
  ) { }

  ngOnInit() {
    let totalRate = 0;
    this.user.feedback.map(async feedback => {
      try {
        totalRate = totalRate + feedback.feedbackStar;
        const response = await this.authService.getUser(feedback.user);
        feedback.user = response.user;
      } catch (e) {
        console.log('LandlordComponent->feedback', e);
      }
    });
    this.rate = parseInt((totalRate / this.user.feedback.length).toFixed(0), 10) - 1;
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
