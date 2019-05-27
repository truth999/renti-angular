import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CONFIG_CONST } from '../../../../../config/config-const';

import { AuthService } from '../../../../core/services/auth.service';
import { CursorWaitService } from '../../../../core/services/cursor-wait.service';

@Component({
  selector: 'app-auth-complete',
  templateUrl: './auth-complete.component.html',
  styleUrls: ['./auth-complete.component.scss']
})
export class AuthCompleteComponent implements OnInit {
  AccountTypes = CONFIG_CONST.accountType;
  accountType: string;

  constructor(
    private router: Router,
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
      console.log('AuthCompleteComponent->getAccountType', e);
    } finally {
      this.cursorWaitService.disable();
    }
  }

  onToProfile() {
    this.router.navigate(['/app/my-profile']);
  }

  onToSearchApartment() {
    this.router.navigate(['/app/rentals/search']);
  }

  onToCreateApartment() {
    this.router.navigate(['/apartment-create']);
  }

}
