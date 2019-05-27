import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CONFIG_CONST } from '../../../../../config/config-const';

import { AuthService } from '../../../../core/services/auth.service';
import { CursorWaitService } from '../../../../core/services/cursor-wait.service';

import { User } from '../../../../shared/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  AccountTypes = CONFIG_CONST.accountType;
  user: User;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private cursorWaitService: CursorWaitService
  ) { }

  ngOnInit() {
    this.getUser();
  }

  async getUser() {
    const id = this.route.snapshot.paramMap.get('id');

    try {
      this.cursorWaitService.enable();

      const response = await this.authService.getUser(id);
      this.user = response.user;
    } catch (e) {
      console.log('ProfileComponent->getUser', e);
    } finally {
      this.cursorWaitService.disable();
    }
  }

}
