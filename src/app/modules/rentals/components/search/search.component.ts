import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../../core/services/auth.service';
import { CursorWaitService } from '../../../../core/services/cursor-wait.service';

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
    private authService: AuthService,
    private cursorWaitService: CursorWaitService
  ) { }

  ngOnInit() {
    this.getAccountType();
  }

  async getAccountType() {
    try {
      this.cursorWaitService.enable();

      const response = await this.authService.getAuthUser();
      this.accountType = response.user.accountType;
    } catch (e) {
      console.log('SearchComponent->ngOnInit', e);
    } finally {
      this.cursorWaitService.disable();
    }
  }

}
