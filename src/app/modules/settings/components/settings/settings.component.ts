import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user: any;
  firstNameCollapsed = false;
  lastNameCollapsed = false;
  emailCollapsed = false;
  passwordCollapsed = false;

  constructor(
    private location: Location,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    try {
      const response = await this.authService.getUser();
      this.user = response.user;
    } finally {
    }
  }

  onBack() {
    this.location.back();
  }

}
