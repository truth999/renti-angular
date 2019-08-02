import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../core/services/auth.service';
import { LayoutService } from '../../services/layout.service';

import { CONFIG_CONST } from '../../../../config/config-const';
import { User } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  AccountTypes = CONFIG_CONST.accountType;
  user: User;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getUser();
  }

  async getUser() {
    try {
      const response = await this.authService.getAuthUser();
      this.user = response.user;
    } catch (e) {
      console.log('LayoutComponent->getAccountType', e);
    }
  }

  onOpenMenu() {
    const mobileMenuContentEl = document.querySelector('.layout');

    mobileMenuContentEl.classList.add('toggled');
  }

  logOut() {
    this.authService.logout();
  }

}
