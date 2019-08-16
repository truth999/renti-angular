import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CONFIG_CONST } from '../../../../../config/config-const';

import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private AccountTypes = CONFIG_CONST.accountType;
  private accountType: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async ngOnInit() {
    try {
      const response = await this.authService.getAuthUser();
      this.accountType = response.user.accountType;

      if (this.accountType === this.AccountTypes.LANDLORD) {
        this.router.navigate(['/app/my-properties']);
      } else if (this.accountType === this.AccountTypes.TENANT) {
        this.router.navigate(['/app/rentals/search']);
      }
    } catch (e) {
      console.log('DashboardComponent->ngOnInit', e);
    }
  }

}
