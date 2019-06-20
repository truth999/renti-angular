import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../core/services/auth.service'
import { LayoutService } from '../../services/layout.service';

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
    private layoutService: LayoutService
  ) { }

  async ngOnInit() {
    try {
      const response = await this.authService.getAuthUser();
      this.accountType = response.user.accountType;
    } catch (e) {
      console.log('LayoutComponent->ngOnInit', e);
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
