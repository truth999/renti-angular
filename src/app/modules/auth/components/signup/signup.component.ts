import { Component, OnInit } from '@angular/core';
import { CONFIG_CONST } from '../../../../../config/config-const';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  typeLandlord = CONFIG_CONST.accountType.LANDLORD;
  typeTenant = CONFIG_CONST.accountType.TENANT;

  isLandlord = false;
  isTenant = false;

  password = '';
  passwordStrengthBarLabel = '';
  baseColor = '#dbdce8';
  phone: string;

  constructor() { }

  ngOnInit() {
  }

  onSelectType(type: string) {
    if (type === this.typeLandlord) {
      this.isLandlord = true;
      this.isTenant = false;
    } else if (type === this.typeTenant) {
      this.isTenant = true;
      this.isLandlord = false;
    }
  }

}
