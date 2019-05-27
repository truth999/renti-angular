import { Component, Input, OnInit } from '@angular/core';

import { CONFIG_CONST } from '../../../../../../config/config-const';

@Component({
  selector: 'app-signup-funnel-complete',
  templateUrl: './signup-funnel-complete.component.html',
  styleUrls: ['./signup-funnel-complete.component.scss']
})
export class SignupFunnelCompleteComponent implements OnInit {

  @Input() accountType: string;

  AccountTypes = CONFIG_CONST.accountType;

  constructor(
  ) { }

  ngOnInit() {
  }

}
