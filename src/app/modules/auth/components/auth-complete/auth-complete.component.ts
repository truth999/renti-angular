import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CONFIG_CONST } from '../../../../../config/config-const';
import { AuthService } from '../../../../core/services/auth.service';

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
    private authService: AuthService
  ) { }

  async ngOnInit() {
    try {
      const response = await this.authService.getUser();
      this.accountType = response.user.accountType;
    } finally {
    }
  }

  onToProfile() {
    this.router.navigate(['/app/my-profile']);
  }

}
