import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { AuthService } from '../../../../core/services/auth.service';
import { CursorWaitService } from '../../../../core/services/cursor-wait.service';

import { User } from '../../../../shared/models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user: User;
  firstNameCollapsed = false;
  lastNameCollapsed = false;
  emailCollapsed = false;
  passwordCollapsed = false;

  constructor(
    private location: Location,
    private authService: AuthService,
    private cursorWaitService: CursorWaitService
  ) { }

  ngOnInit() {
    this.getUser();
  }

  async getUser() {
    try {
      this.cursorWaitService.enable();

      const response = await this.authService.getAuthUser();
      this.user = response.user;
    } catch (e) {
      console.log('SettingsComponent->getUser', e);
    } finally {
      this.cursorWaitService.disable();
    }
  }

  updatedUser() {
    this.getUser();
  }

  onBack() {
    this.location.back();
  }

}
