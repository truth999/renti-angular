import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { environment } from '../../../../../environments/environment';

import { AuthService } from '../../../../core/services/auth.service';
import { LandlordService } from '../../services/landlord.service';

import { Feedback, Landlord } from '../../../../shared/models';

@Component({
  selector: 'app-profile-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.scss']
})
export class LandlordComponent implements OnInit {
  landlord: Landlord;
  feedbacks: Feedback[];
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
      this.landlord = response.landlord;
      let totalRate = 0;

      const feedbackResponse = await this.landlordService.getFeedbacks();
      this.feedbacks = feedbackResponse.feedbacks.filter(feedback => {
        return feedback.landlord === id;
      });

      this.feedbacks.map(feedback => {
        totalRate = totalRate + feedback.feedbackStar;
      });
      this.rate = parseInt((totalRate / this.landlord.feedback.length).toFixed(0), 10) - 1;
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
