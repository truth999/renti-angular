import { Component, OnInit } from '@angular/core';

import { CONFIG_CONST } from '../../../../../config/config-const';

import { AuthService } from '../../../../core/services/auth.service';
import { HeatmapService } from '../../services/heatmap.service';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements OnInit {
  AccountTypes = CONFIG_CONST.accountType;
  accountType: string;
  defaultLocation: any;

  constructor(
    private authService: AuthService,
    private heatmapService: HeatmapService
  ) { }

  ngOnInit() {
    this.getAccountType();
    this.getDefaultLocation();
  }

  async getAccountType() {
    try {
      const userResponse = await this.authService.getAuthUser();
      this.accountType = userResponse.user.accountType;
    } catch (e) {
      console.log('HeatmapComponent->getAccountType', e);
    }
  }

  async getDefaultLocation() {
    try {
      const countryResponse = await this.heatmapService.getDefaultLocation();
      this.defaultLocation = countryResponse.location;
    } catch (e) {
      console.log('HeatmapComponent->getDefaultLocation', e);
    }
  }

}
