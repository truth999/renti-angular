import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../core/services/auth.service';

import { CONFIG_CONST } from '../../../../config/config-const';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  AccountTypes = CONFIG_CONST.accountType;
  accountType: string;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.getAccountType();
  }

  async getAccountType() {
    const response = await this.authService.getAuthUser();
    this.accountType = response.user.accountType;
  }

  onOpenMenu() {
    const mobileMenuContentEl = document.querySelector('.layout');

    mobileMenuContentEl.classList.add('toggled');
  }

  logOut() {
    this.authService.logout();
  }

}
