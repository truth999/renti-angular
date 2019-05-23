import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../../core/services/auth.service';

import { CONFIG_CONST } from '../../../../../config/config-const';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  ACCOUNT_TYPE = CONFIG_CONST.accountType;
  accountType: string;

  constructor(
    private authService: AuthService
  ) { }

  async ngOnInit() {
    try {
      const response = await this.authService.getUser();
      this.accountType = response.user.accountType;
    } catch (e) {
      console.log('SearchComponent->ngOnInit', e);
    }
  }

}
