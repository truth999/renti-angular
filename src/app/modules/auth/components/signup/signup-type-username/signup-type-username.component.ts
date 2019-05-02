import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { CONFIG_CONST } from '../../../../../../config/config-const';

@Component({
  selector: 'app-signup-type-username',
  templateUrl: './signup-type-username.component.html',
  styleUrls: ['./signup-type-username.component.scss']
})
export class SignupTypeUsernameComponent implements OnInit {
  @Output() typeSelected = new EventEmitter<string>();

  typeLandlord = CONFIG_CONST.accountType.LANDLORD;
  typeTenant = CONFIG_CONST.accountType.TENANT;

  isLandlord = false;
  isTenant = false;

  constructor() { }

  ngOnInit() {
  }

  onSelectType(type: string) {
    this.typeSelected.emit(type);
    if (type === this.typeLandlord) {
      this.isLandlord = true;
      this.isTenant = false;
    } else if (type === this.typeTenant) {
      this.isTenant = true;
      this.isLandlord = false;
    }
  }

}
