import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { User } from '../../../../../shared/models';

import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-profile-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.scss']
})
export class LandlordComponent implements OnInit {
  @Input() user: User;
  uploadBase = environment.uploadBase;

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }

  onBack() {
    this.location.back();
  }

}
