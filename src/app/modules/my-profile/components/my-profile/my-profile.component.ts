import { Component, OnInit } from '@angular/core';

import { CONFIG_CONST } from '../../../../../config/config-const';

import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  AccountTypes = CONFIG_CONST.accountType;
  accountType: string;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getAccountType();
  }

  async getAccountType() {
    try {
      const response = await this.authService.getAuthUser();
      this.accountType = response.user.accountType;
    } catch (e) {
      console.log('MyProfileComponent->getAccountType', e);
    }
  }
}
