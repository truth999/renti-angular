import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CONFIG_CONST } from '../../../../../config/config-const';

import { AuthService } from '../../../../core/services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { CursorWaitService } from '../../../../core/services/cursor-wait.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  AccountTypes = CONFIG_CONST.accountType;
  accountType: string;
  user: any;

  landlordId: string;
  tenantId: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private cursorWaitService: CursorWaitService
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    try {
      this.cursorWaitService.enable();

      const response = await this.profileService.getUser(id);
      this.user = response.user;
      this.accountType = response.user.accountType;
      if (this.accountType === this.AccountTypes.LANDLORD) {
        this.landlordId = response.user.landlordId;
      } else {
        this.tenantId = response.user.tenantId;
      }
    } catch (e) {
      console.log('ProfileComponent->ngOnInit', e);
    } finally {
      this.cursorWaitService.disable();
    }
  }

}
