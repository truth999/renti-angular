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

  async ngOnInit() {
    try {
      const response = await this.authService.getUser();
      this.accountType = response.user.accountType;
    } finally {
    }
  }
}
